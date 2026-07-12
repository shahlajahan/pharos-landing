import { admin, getFirestoreDb } from "../firebase-admin";
import { PAYMENT_PROVIDER } from "./constants";
import { logPaymentEvent } from "./monitoring";
import type { Currency, PaymentRecordStatus, PaymentType } from "./types";

const COLLECTION = "paymentRecords";

/**
 * When true, persistence failures are rethrown instead of swallowed. Off by
 * default because Firestore credentials are not yet configured in this
 * deployment (see memory: firestore-graceful-degradation) — flip this once
 * production Firebase credentials are confirmed.
 */
const STRICT_MODE = process.env.PAYMENT_PERSISTENCE_STRICT === "true";

export interface NewPaymentRecordInput {
    conversationId: string;
    referenceId?: string;
    paymentType: PaymentType;
    title: string;
    amount: string;
    currency: Currency;
    customerEmail: string;
    customerName: string;
    /** The provider's own correlation token (e.g. iyzico's checkout token). Indexed, never the doc ID — see findPaymentByProviderToken. */
    providerToken: string;
}

export interface PaymentResultInput {
    status: Extract<PaymentRecordStatus, "paid" | "failed" | "pending_verification">;
    providerToken: string;
    providerPaymentId?: string;
    failureCode?: string;
    failureMessage?: string;
}

export interface PaymentRecord extends NewPaymentRecordInput {
    provider: typeof PAYMENT_PROVIDER;
    status: PaymentRecordStatus;
    providerPaymentId?: string;
    failureCode?: string;
    failureMessage?: string;
    createdAt?: FirebaseFirestore.Timestamp;
    updatedAt?: FirebaseFirestore.Timestamp;
}

function logPersistenceError(operation: string, error: unknown, context?: Record<string, unknown>) {
    console.error("PAYMENT_PERSISTENCE_ERROR", {
        operation,
        message: error instanceof Error ? error.message : String(error),
        ...context,
    });
}

async function withGracefulFirestore<T>(
    operation: string,
    fn: (db: FirebaseFirestore.Firestore) => Promise<T>,
    context?: Record<string, unknown>,
): Promise<T | null> {
    const db = getFirestoreDb();

    if (!db) {
        logPersistenceError(operation, new Error("Firestore is not available (missing credentials)."), context);

        if (STRICT_MODE) {
            throw new Error("Firestore is not available.");
        }

        return null;
    }

    try {
        return await fn(db);
    } catch (error) {
        logPersistenceError(operation, error, context);

        if (STRICT_MODE) {
            throw error;
        }

        return null;
    }
}

/** Best-effort. Payment initialization must succeed even if this fails. */
export async function createInitializedRecord(input: NewPaymentRecordInput): Promise<void> {
    await withGracefulFirestore(
        "createInitializedRecord",
        async (db) => {
            const now = admin.firestore.FieldValue.serverTimestamp();

            await db
                .collection(COLLECTION)
                .doc(input.conversationId)
                .set({
                    ...input,
                    provider: PAYMENT_PROVIDER,
                    status: "initialized",
                    createdAt: now,
                    updatedAt: now,
                    initializedAt: now,
                });
        },
        { conversationId: input.conversationId },
    );
}

/**
 * Idempotent: a payment already marked "paid" is never overwritten, so a
 * duplicate callback/retrieve — or a later reconciliation pass — cannot
 * double-process or downgrade a completed payment. Transitions into
 * "pending_verification" (transient retrieve failure, or an amount/currency
 * mismatch) and out of it again (via a later reconciliation resolving to
 * paid/failed) are both allowed; only "paid" is terminal.
 */
export async function markPaymentResult(conversationId: string, result: PaymentResultInput): Promise<void> {
    await withGracefulFirestore(
        "markPaymentResult",
        async (db) => {
            const ref = db.collection(COLLECTION).doc(conversationId);

            await db.runTransaction(async (tx) => {
                const snapshot = await tx.get(ref);

                if (!snapshot.exists) {
                    throw new Error(`No payment record found for conversationId ${conversationId}.`);
                }

                if (snapshot.data()?.status === "paid") {
                    return;
                }

                const now = admin.firestore.FieldValue.serverTimestamp();

                tx.update(ref, {
                    status: result.status,
                    providerToken: result.providerToken,
                    providerPaymentId: result.providerPaymentId ?? null,
                    failureCode: result.failureCode ?? null,
                    failureMessage: result.failureMessage ?? null,
                    paidAt: result.status === "paid" ? now : null,
                    updatedAt: now,
                });
            });

            logPaymentEvent("PAYMENT_RECORD_UPDATED", { conversationId, status: result.status });
        },
        { conversationId, status: result.status },
    );
}

export async function getRecordByConversationId(conversationId: string): Promise<PaymentRecord | null> {
    return withGracefulFirestore(
        "getRecordByConversationId",
        async (db) => {
            const snapshot = await db.collection(COLLECTION).doc(conversationId).get();

            if (!snapshot.exists) {
                return null;
            }

            return snapshot.data() as PaymentRecord;
        },
        { conversationId },
    );
}

/**
 * Resolves a payment record by the provider's own correlation token instead
 * of our conversationId. This is the callback entry point: iyzico's retrieve
 * response cannot be trusted to echo back our original conversationId (its
 * `conversationId` field is only a per-request trace id), so the provider
 * token is the one stable, genuinely-shared identifier available at
 * callback time. conversationId remains the Firestore document ID —
 * providerToken/provider are plain indexed fields, queried here rather than
 * used as the primary key, so adding another provider later never requires
 * changing the collection's key scheme.
 */
export async function findPaymentByProviderToken(
    provider: string,
    providerToken: string,
): Promise<PaymentRecord | null> {
    return withGracefulFirestore(
        "findPaymentByProviderToken",
        async (db) => {
            const snapshot = await db
                .collection(COLLECTION)
                .where("provider", "==", provider)
                .where("providerToken", "==", providerToken)
                .limit(1)
                .get();

            if (snapshot.empty) {
                return null;
            }

            return snapshot.docs[0].data() as PaymentRecord;
        },
        { provider, providerToken },
    );
}

/**
 * Finds records in any of `statuses` older than `olderThanMs`, for
 * reconciliation. Requires a composite Firestore index on
 * (status ASC, createdAt ASC) — see firestore.indexes.json. Every matched
 * record has a providerToken by construction (it's required at creation),
 * so reconciliation can always re-check it against iyzico.
 */
export async function findRecordsForReconciliation(input: {
    statuses: Extract<PaymentRecordStatus, "initialized" | "pending_verification">[];
    olderThanMs: number;
    limit: number;
}): Promise<PaymentRecord[]> {
    const records = await withGracefulFirestore(
        "findRecordsForReconciliation",
        async (db) => {
            const threshold = admin.firestore.Timestamp.fromMillis(Date.now() - input.olderThanMs);

            const snapshots = await Promise.all(
                input.statuses.map((status) =>
                    db
                        .collection(COLLECTION)
                        .where("status", "==", status)
                        .where("createdAt", "<=", threshold)
                        .limit(input.limit)
                        .get(),
                ),
            );

            return snapshots.flatMap((snapshot) => snapshot.docs.map((doc) => doc.data() as PaymentRecord));
        },
        { statuses: input.statuses.join(","), olderThanMs: input.olderThanMs },
    );

    return records ?? [];
}
