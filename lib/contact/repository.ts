import { admin, getFirestoreDb } from "../firebase-admin";
import type { ContactRequestInput } from "./types";

const COLLECTION = "contactRequests";

/**
 * Unlike the payment domain, contact requests have no external provider
 * whose result is authoritative — Firestore genuinely is the only record of
 * this submission. A write failure here must be surfaced to the caller as a
 * real failure (never swallowed/best-effort), so the user never sees a false
 * "sent" confirmation for a message that was never persisted.
 */
export async function createContactRequest(input: ContactRequestInput): Promise<string> {
    const db = getFirestoreDb();

    if (!db) {
        throw new Error("Firestore is not available; cannot persist contact request.");
    }

    const now = admin.firestore.FieldValue.serverTimestamp();

    const ref = await db.collection(COLLECTION).add({
        name: input.name,
        email: input.email,
        phone: input.phone ?? null,
        service: input.service,
        budget: input.budget ?? null,
        message: input.message,
        status: "new",
        source: "website",
        createdAt: now,
        updatedAt: now,
    });

    return ref.id;
}
