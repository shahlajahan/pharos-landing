import { RECONCILIATION_MIN_AGE_MINUTES } from "./constants";
import { retrieveAndFinalizePayment } from "./engine";
import { hashToken, logPaymentEvent } from "./monitoring";
import { findRecordsForReconciliation } from "./repository";

export interface ReconciliationSummary {
    checked: number;
    resolvedPaid: number;
    resolvedFailed: number;
    stillPending: number;
    errors: number;
}

/**
 * Re-checks payment records stuck in "initialized" or "pending_verification"
 * against iyzico's own retrieve endpoint — the same read-only call and the
 * exact same idempotent finalize logic (retrieveAndFinalizePayment) used by
 * the live callback route. This is intentionally NOT a separate code path:
 * reusing it guarantees reconciliation can never charge again (it only ever
 * reads), can never double-process a payment (the same "paid" transaction
 * guard applies), and can never consume a payment link twice.
 *
 * Records genuinely abandoned (checkout created, never completed) resolve
 * naturally here: iyzico's retrieve for such a token returns a deterministic
 * "no payment found" response, which retrieveAndFinalizePayment already
 * turns into a clean "failed" outcome — no separate abandoned-checkout code
 * path is needed for that case.
 *
 * Records stuck in "pending_verification" due to an amount/currency
 * mismatch are deliberately NOT auto-resolved either way by this function —
 * that condition needs a human decision (the customer may genuinely have
 * paid, just with a data discrepancy), so automatically marking it "failed"
 * would be exactly as much of a guess as marking it "paid". Those stay
 * pending and simply get counted in `stillPending` on every run, which is
 * what makes them visible to whoever is watching PAYMENT_AMOUNT_MISMATCH /
 * reconciliation logs.
 */
export async function reconcileUnresolvedPayments(options?: { limit?: number }): Promise<ReconciliationSummary> {
    const limit = options?.limit ?? 50;
    const summary: ReconciliationSummary = {
        checked: 0,
        resolvedPaid: 0,
        resolvedFailed: 0,
        stillPending: 0,
        errors: 0,
    };

    const records = await findRecordsForReconciliation({
        statuses: ["initialized", "pending_verification"],
        olderThanMs: RECONCILIATION_MIN_AGE_MINUTES * 60 * 1000,
        limit,
    });

    for (const record of records) {
        summary.checked += 1;

        if (!record.providerToken) {
            // Should not happen — providerToken is required at creation —
            // but never reconcile a record we can't verify against the provider.
            summary.errors += 1;
            continue;
        }

        try {
            const finalized = await retrieveAndFinalizePayment(record.providerToken);

            if (finalized.outcome === "paid") {
                summary.resolvedPaid += 1;
            } else if (finalized.outcome === "failed") {
                summary.resolvedFailed += 1;
            } else {
                summary.stillPending += 1;
            }
        } catch (error) {
            summary.errors += 1;
            console.error("PAYMENT_RECONCILIATION_ITEM_ERROR", {
                conversationId: record.conversationId,
                tokenHash: hashToken(record.providerToken),
                message: error instanceof Error ? error.message : String(error),
            });
        }
    }

    logPaymentEvent("PAYMENT_RECONCILIATION_RESULT", { ...summary });

    return summary;
}
