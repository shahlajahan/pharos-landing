import { admin, getFirestoreDb } from "../firebase-admin";
import { DEFAULT_PAYMENT_LINK_EXPIRY_DAYS, MAX_PAYMENT_AMOUNT } from "./constants";
import { logPaymentEvent } from "./monitoring";
import type { Currency, PaymentType } from "./types";
import { generatePaymentReferenceId } from "./utils";

const COLLECTION = "paymentLinks";

export interface PaymentLinkRecord {
    referenceId: string;
    paymentType: Extract<PaymentType, "deposit" | "payment_link">;
    title: string;
    description?: string;
    amount: number;
    currency: Currency;
    status: "active" | "consumed" | "expired";
    expiresAt?: Date;
    consumedAt?: Date;
    consumedByConversationId?: string;
    provider?: string;
    providerPaymentId?: string;
}

/** Public-safe projection returned to the browser — never customer PII. */
export type PublicPaymentLink = Pick<
    PaymentLinkRecord,
    "referenceId" | "paymentType" | "title" | "description" | "amount" | "currency"
>;

export type PaymentLinkDisplayState =
    | { kind: "payable"; link: PublicPaymentLink }
    | { kind: "consumed" }
    | { kind: "expired" }
    | { kind: "not_found" };

function logError(operation: string, error: unknown, context?: Record<string, unknown>) {
    console.error("PAYMENT_LINK_STORE_ERROR", {
        operation,
        message: error instanceof Error ? error.message : String(error),
        ...context,
    });
}

function isExpired(data: { expiresAt?: FirebaseFirestore.Timestamp | null }): boolean {
    return Boolean(data.expiresAt && data.expiresAt.toDate().getTime() < Date.now());
}

/**
 * Resolves an active, non-expired, NOT-YET-CONSUMED payment link by its
 * unguessable referenceId. This is the strict, payment-authorization path —
 * used by resolvePaymentRequest() to decide whether a payment may proceed.
 * Returns null for missing/expired/consumed links or if Firestore is
 * unavailable — callers must treat null as "cannot pay" rather than falling
 * back to any client-supplied amount.
 */
export async function getActivePaymentLink(referenceId: string): Promise<PaymentLinkRecord | null> {
    const db = getFirestoreDb();

    if (!db) {
        logError("getActivePaymentLink", new Error("Firestore is not available."), { referenceId });
        return null;
    }

    try {
        const snapshot = await db.collection(COLLECTION).doc(referenceId).get();

        if (!snapshot.exists) {
            return null;
        }

        const data = snapshot.data() as (PaymentLinkRecord & { expiresAt?: FirebaseFirestore.Timestamp }) | undefined;

        if (!data || data.status !== "active") {
            return null;
        }

        if (isExpired(data)) {
            return null;
        }

        return { ...data, expiresAt: data.expiresAt?.toDate() };
    } catch (error) {
        logError("getActivePaymentLink", error, { referenceId });
        return null;
    }
}

/**
 * Page-display-only lookup: distinguishes *why* a link can't be paid
 * (already consumed vs. expired vs. never existed) so /pay/<referenceId>
 * can show accurate messaging. Never used for payment authorization — that
 * always goes through the strict getActivePaymentLink() above.
 */
export async function getPaymentLinkDisplayState(referenceId: string): Promise<PaymentLinkDisplayState> {
    const db = getFirestoreDb();

    if (!db) {
        logError("getPaymentLinkDisplayState", new Error("Firestore is not available."), { referenceId });
        return { kind: "not_found" };
    }

    try {
        const snapshot = await db.collection(COLLECTION).doc(referenceId).get();

        if (!snapshot.exists) {
            return { kind: "not_found" };
        }

        const data = snapshot.data() as (PaymentLinkRecord & { expiresAt?: FirebaseFirestore.Timestamp }) | undefined;

        if (!data) {
            return { kind: "not_found" };
        }

        if (data.status === "consumed") {
            return { kind: "consumed" };
        }

        if (data.status === "expired" || isExpired(data)) {
            return { kind: "expired" };
        }

        return { kind: "payable", link: toPublicPaymentLink(data) };
    } catch (error) {
        logError("getPaymentLinkDisplayState", error, { referenceId });
        return { kind: "not_found" };
    }
}

export function toPublicPaymentLink(record: PaymentLinkRecord): PublicPaymentLink {
    return {
        referenceId: record.referenceId,
        paymentType: record.paymentType,
        title: record.title,
        description: record.description,
        amount: record.amount,
        currency: record.currency,
    };
}

/**
 * Marks a payment link consumed after iyzico has confirmed the payment
 * server-side (status: success, paymentStatus: SUCCESS) — never at
 * initialize time, never for an abandoned checkout. Idempotent: if the link
 * is already "consumed" (including by this same conversationId, on a
 * duplicate callback), this is a no-op — it never errors and never
 * re-consumes. Best-effort like the rest of the persistence layer: a
 * Firestore failure here is logged at high severity (this is exactly the
 * scenario that would allow link reuse) but never breaks the payment
 * redirect decision. Reconciliation (lib/payment/reconciliation.ts) retries
 * this same call for any payment it resolves to paid, giving a recovery
 * path if this write failed at callback time.
 */
export async function markPaymentLinkConsumed(
    referenceId: string,
    input: { conversationId: string; provider: string; providerPaymentId?: string },
): Promise<void> {
    const db = getFirestoreDb();

    if (!db) {
        logPaymentEvent(
            "PAYMENT_RECORD_NOT_FOUND_HIGH_SEVERITY",
            { reason: "firestore-unavailable-at-link-consume", referenceId, conversationId: input.conversationId },
            "high",
        );
        return;
    }

    try {
        const ref = db.collection(COLLECTION).doc(referenceId);

        await db.runTransaction(async (tx) => {
            const snapshot = await tx.get(ref);

            if (!snapshot.exists) {
                logPaymentEvent(
                    "PAYMENT_RECORD_NOT_FOUND_HIGH_SEVERITY",
                    { reason: "payment-link-missing-at-consume", referenceId, conversationId: input.conversationId },
                    "high",
                );
                return;
            }

            if (snapshot.data()?.status === "consumed") {
                return;
            }

            const now = admin.firestore.FieldValue.serverTimestamp();

            tx.update(ref, {
                status: "consumed",
                consumedAt: now,
                consumedByConversationId: input.conversationId,
                provider: input.provider,
                providerPaymentId: input.providerPaymentId ?? null,
                updatedAt: now,
            });
        });

        logPaymentEvent("PAYMENT_LINK_CONSUMED", { referenceId, conversationId: input.conversationId });
    } catch (error) {
        logPaymentEvent(
            "PAYMENT_RECORD_NOT_FOUND_HIGH_SEVERITY",
            {
                reason: "payment-link-consume-failed",
                referenceId,
                conversationId: input.conversationId,
                message: error instanceof Error ? error.message : String(error),
            },
            "high",
        );
    }
}

/**
 * Development/operator-only creation path. Intentionally not exposed over
 * HTTP — see scripts/create-payment-link.mjs. Do not wire this into any
 * public API route without an authentication layer.
 */
export async function createPaymentLink(input: {
    paymentType: Extract<PaymentType, "deposit" | "payment_link">;
    title: string;
    description?: string;
    amount: number;
    currency: Currency;
    expiresAt?: Date;
}): Promise<PaymentLinkRecord> {
    if (!Number.isFinite(input.amount) || input.amount <= 0) {
        throw new Error("Payment link amount must be a positive, finite number.");
    }

    if (input.amount > MAX_PAYMENT_AMOUNT) {
        throw new Error(`Payment link amount exceeds the maximum allowed amount (${MAX_PAYMENT_AMOUNT}).`);
    }

    const db = getFirestoreDb();

    if (!db) {
        throw new Error("Firestore is not available; cannot create a payment link record.");
    }

    const referenceId = generatePaymentReferenceId();
    const expiresAt =
        input.expiresAt ?? new Date(Date.now() + DEFAULT_PAYMENT_LINK_EXPIRY_DAYS * 24 * 60 * 60 * 1000);

    const record: PaymentLinkRecord = {
        referenceId,
        paymentType: input.paymentType,
        title: input.title,
        description: input.description,
        amount: input.amount,
        currency: input.currency,
        status: "active",
        expiresAt,
    };

    await db
        .collection(COLLECTION)
        .doc(referenceId)
        .set({
            ...record,
            expiresAt,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

    return record;
}
