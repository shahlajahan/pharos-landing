import { test, describe, before, beforeEach, mock } from "node:test";
import assert from "node:assert/strict";

import { FakeFirestore, FakeTimestamp, createFakeAdmin } from "./fake-firestore";

let currentDb = new FakeFirestore();
const originalFetch = globalThis.fetch;
let fetchImpl: typeof fetch = originalFetch;

before(() => {
    process.env.IYZICO_API_KEY = "test-api-key";
    process.env.IYZICO_SECRET_KEY = "test-secret-key";
    process.env.IYZICO_BASE_URL = "https://sandbox-api.iyzipay.com";
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";

    mock.module("../../firebase-admin", {
        namedExports: {
            admin: createFakeAdmin(),
            getFirestoreDb: () => currentDb,
        },
    });

    globalThis.fetch = ((...args: Parameters<typeof fetch>) => fetchImpl(...args)) as typeof fetch;
});

beforeEach(() => {
    currentDb = new FakeFirestore();
    fetchImpl = originalFetch;
});

function jsonResponse(status: number, body: unknown): Response {
    return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

function seedRecord(
    db: FakeFirestore,
    input: {
        conversationId: string;
        referenceId?: string;
        paymentType: "service" | "deposit" | "payment_link";
        status: "initialized" | "paid" | "failed" | "pending_verification";
        amount: string;
        currency: string;
        providerToken: string;
        createdAtMillis?: number;
    },
) {
    db.seed("paymentRecords", input.conversationId, {
        conversationId: input.conversationId,
        referenceId: input.referenceId,
        paymentType: input.paymentType,
        title: "Test payment",
        amount: input.amount,
        currency: input.currency,
        customerEmail: "test@example.com",
        customerName: "Test User",
        providerToken: input.providerToken,
        provider: "iyzico",
        status: input.status,
        createdAt: new FakeTimestamp(input.createdAtMillis ?? Date.now()),
    });
}

function seedLink(
    db: FakeFirestore,
    input: { referenceId: string; amount: number; currency: string; status: "active" | "consumed" | "expired"; expiresAtMillis?: number },
) {
    db.seed("paymentLinks", input.referenceId, {
        referenceId: input.referenceId,
        paymentType: "deposit",
        title: "Test deposit",
        amount: input.amount,
        currency: input.currency,
        status: input.status,
        expiresAt: input.expiresAtMillis !== undefined ? { toDate: () => new Date(input.expiresAtMillis!) } : undefined,
    });
}

describe("payment link consumption (Phase 1)", () => {
    test("one successful payment consumes the link and marks the record paid", async () => {
        const { retrieveAndFinalizePayment } = await import("../engine");

        seedLink(currentDb, { referenceId: "link-1", amount: 5000, currency: "TRY", status: "active" });
        seedRecord(currentDb, {
            conversationId: "PHR-1",
            referenceId: "link-1",
            paymentType: "deposit",
            status: "initialized",
            amount: "5000.00",
            currency: "TRY",
            providerToken: "tok-1",
        });

        fetchImpl = async () =>
            jsonResponse(200, {
                status: "success",
                paymentStatus: "SUCCESS",
                conversationId: "iyzico-trace-id",
                paidPrice: "5000.00",
                currency: "TRY",
                paymentId: "pay-1",
            });

        const result = await retrieveAndFinalizePayment("tok-1");

        assert.equal(result.outcome, "paid");
        assert.equal(currentDb.peek("paymentRecords", "PHR-1")?.status, "paid");
        assert.equal(currentDb.peek("paymentLinks", "link-1")?.status, "consumed");
        assert.equal(currentDb.peek("paymentLinks", "link-1")?.consumedByConversationId, "PHR-1");
    });

    test("duplicate callback after paid is idempotent — does not re-consume or error", async () => {
        const { retrieveAndFinalizePayment } = await import("../engine");

        seedLink(currentDb, { referenceId: "link-2", amount: 5000, currency: "TRY", status: "active" });
        seedRecord(currentDb, {
            conversationId: "PHR-2",
            referenceId: "link-2",
            paymentType: "deposit",
            status: "initialized",
            amount: "5000.00",
            currency: "TRY",
            providerToken: "tok-2",
        });

        fetchImpl = async () =>
            jsonResponse(200, {
                status: "success",
                paymentStatus: "SUCCESS",
                paidPrice: "5000.00",
                currency: "TRY",
                paymentId: "pay-2",
            });

        const first = await retrieveAndFinalizePayment("tok-2");
        const second = await retrieveAndFinalizePayment("tok-2");

        assert.equal(first.outcome, "paid");
        assert.equal(second.outcome, "paid");
        assert.equal(currentDb.peek("paymentRecords", "PHR-2")?.status, "paid");
        assert.equal(currentDb.peek("paymentLinks", "link-2")?.status, "consumed");
    });

    test("a consumed link can no longer be paid (getActivePaymentLink rejects it)", async () => {
        const { getActivePaymentLink } = await import("../payment-links");

        seedLink(currentDb, { referenceId: "link-3", amount: 5000, currency: "TRY", status: "consumed" });

        const link = await getActivePaymentLink("link-3");
        assert.equal(link, null);
    });

    test("an expired link is rejected even if still marked active", async () => {
        const { getActivePaymentLink, getPaymentLinkDisplayState } = await import("../payment-links");

        seedLink(currentDb, {
            referenceId: "link-4",
            amount: 5000,
            currency: "TRY",
            status: "active",
            expiresAtMillis: Date.now() - 1000,
        });

        assert.equal(await getActivePaymentLink("link-4"), null);
        assert.deepEqual(await getPaymentLinkDisplayState("link-4"), { kind: "expired" });
    });
});

describe("retrieve resilience (Phase 3)", () => {
    test("transient failures exhausting retries throw a transient PaymentProviderError", async () => {
        const { retrieveCheckoutForm } = await import("../providers/iyzico");
        const { PaymentProviderError } = await import("../types");

        let callCount = 0;
        fetchImpl = async () => {
            callCount += 1;
            throw new DOMException("The operation was aborted.", "TimeoutError");
        };

        await assert.rejects(
            () => retrieveCheckoutForm("tok-timeout"),
            (error: unknown) => error instanceof PaymentProviderError && error.transient === true,
        );

        assert.equal(callCount, 3); // IYZICO_RETRIEVE_MAX_ATTEMPTS
    });

    test("a transient 5xx then success resolves without surfacing an error", async () => {
        const { retrieveCheckoutForm } = await import("../providers/iyzico");

        let callCount = 0;
        fetchImpl = async () => {
            callCount += 1;
            if (callCount === 1) {
                return new Response("", { status: 503 });
            }
            return jsonResponse(200, { status: "success", paymentStatus: "SUCCESS", paidPrice: "100.00", currency: "TRY" });
        };

        const result = await retrieveCheckoutForm("tok-retry-success");
        assert.equal(result.status, "success");
        assert.equal(callCount, 2);
    });

    test("a deterministic business failure is returned as-is, not retried", async () => {
        const { retrieveCheckoutForm } = await import("../providers/iyzico");

        let callCount = 0;
        fetchImpl = async () => {
            callCount += 1;
            return jsonResponse(200, { status: "failure", errorCode: "5001", errorMessage: "Token not found" });
        };

        const result = await retrieveCheckoutForm("tok-declined");
        assert.equal(result.status, "failure");
        assert.equal(callCount, 1);
    });

    test("a transient retrieve failure surfaces as pending_verification, not a definitive decline", async () => {
        const { retrieveAndFinalizePayment } = await import("../engine");

        seedRecord(currentDb, {
            conversationId: "PHR-5",
            paymentType: "service",
            status: "initialized",
            amount: "100.00",
            currency: "TRY",
            providerToken: "tok-5",
        });

        fetchImpl = async () => {
            throw new DOMException("The operation was aborted.", "TimeoutError");
        };

        const result = await retrieveAndFinalizePayment("tok-5");
        assert.equal(result.outcome, "pending_verification");
        assert.equal(currentDb.peek("paymentRecords", "PHR-5")?.status, "pending_verification");
    });
});

describe("amount/currency verification (Phase 5)", () => {
    test("amount mismatch never marks paid — goes to pending_verification", async () => {
        const { retrieveAndFinalizePayment } = await import("../engine");

        seedRecord(currentDb, {
            conversationId: "PHR-6",
            paymentType: "service",
            status: "initialized",
            amount: "5000.00",
            currency: "TRY",
            providerToken: "tok-6",
        });

        fetchImpl = async () =>
            jsonResponse(200, { status: "success", paymentStatus: "SUCCESS", paidPrice: "4000.00", currency: "TRY" });

        const result = await retrieveAndFinalizePayment("tok-6");
        assert.equal(result.outcome, "pending_verification");
        assert.equal(currentDb.peek("paymentRecords", "PHR-6")?.status, "pending_verification");
    });

    test("currency mismatch never marks paid — goes to pending_verification", async () => {
        const { retrieveAndFinalizePayment } = await import("../engine");

        seedRecord(currentDb, {
            conversationId: "PHR-7",
            paymentType: "service",
            status: "initialized",
            amount: "5000.00",
            currency: "TRY",
            providerToken: "tok-7",
        });

        fetchImpl = async () =>
            jsonResponse(200, { status: "success", paymentStatus: "SUCCESS", paidPrice: "5000.00", currency: "USD" });

        const result = await retrieveAndFinalizePayment("tok-7");
        assert.equal(result.outcome, "pending_verification");
        assert.equal(currentDb.peek("paymentRecords", "PHR-7")?.status, "pending_verification");
    });

    test("matching amount and currency marks paid", async () => {
        const { retrieveAndFinalizePayment } = await import("../engine");

        seedRecord(currentDb, {
            conversationId: "PHR-7b",
            paymentType: "service",
            status: "initialized",
            amount: "5000.00",
            currency: "TRY",
            providerToken: "tok-7b",
        });

        fetchImpl = async () =>
            jsonResponse(200, { status: "success", paymentStatus: "SUCCESS", paidPrice: "5000.00", currency: "try" });

        const result = await retrieveAndFinalizePayment("tok-7b");
        assert.equal(result.outcome, "paid");
    });
});

describe("missing internal record (Phase 4/7)", () => {
    test("provider success with no internal record still redirects to success, not silently lost", async () => {
        const { retrieveAndFinalizePayment } = await import("../engine");

        fetchImpl = async () =>
            jsonResponse(200, { status: "success", paymentStatus: "SUCCESS", paidPrice: "100.00", currency: "TRY" });

        const result = await retrieveAndFinalizePayment("tok-orphan");
        assert.equal(result.outcome, "paid");
        assert.equal(result.conversationId, undefined);
    });

    test("provider failure with no internal record redirects to failed", async () => {
        const { retrieveAndFinalizePayment } = await import("../engine");

        fetchImpl = async () => jsonResponse(200, { status: "failure", errorMessage: "no payment found" });

        const result = await retrieveAndFinalizePayment("tok-orphan-2");
        assert.equal(result.outcome, "failed");
    });
});

describe("reconciliation (Phase 4)", () => {
    test("reconciles a stale initialized record to paid using the same finalize logic", async () => {
        const { reconcileUnresolvedPayments } = await import("../reconciliation");

        seedRecord(currentDb, {
            conversationId: "PHR-8",
            paymentType: "service",
            status: "initialized",
            amount: "100.00",
            currency: "TRY",
            providerToken: "tok-8",
            createdAtMillis: Date.now() - 60 * 60 * 1000,
        });

        fetchImpl = async () =>
            jsonResponse(200, { status: "success", paymentStatus: "SUCCESS", paidPrice: "100.00", currency: "TRY" });

        const summary = await reconcileUnresolvedPayments();
        assert.equal(summary.resolvedPaid, 1);
        assert.equal(currentDb.peek("paymentRecords", "PHR-8")?.status, "paid");
    });

    test("an abandoned checkout reconciles to failed, not left ambiguous forever", async () => {
        const { reconcileUnresolvedPayments } = await import("../reconciliation");

        seedRecord(currentDb, {
            conversationId: "PHR-9",
            paymentType: "service",
            status: "initialized",
            amount: "100.00",
            currency: "TRY",
            providerToken: "tok-9",
            createdAtMillis: Date.now() - 25 * 60 * 60 * 1000,
        });

        fetchImpl = async () => jsonResponse(200, { status: "failure", errorMessage: "no payment info for token" });

        const summary = await reconcileUnresolvedPayments();
        assert.equal(summary.resolvedFailed, 1);
        assert.equal(currentDb.peek("paymentRecords", "PHR-9")?.status, "failed");
    });

    test("reconciliation never selects an already-paid record (structurally excluded from the query)", async () => {
        const { findRecordsForReconciliation } = await import("../repository");

        seedRecord(currentDb, {
            conversationId: "PHR-10",
            paymentType: "service",
            status: "paid",
            amount: "100.00",
            currency: "TRY",
            providerToken: "tok-10",
            createdAtMillis: Date.now() - 60 * 60 * 1000,
        });

        const records = await findRecordsForReconciliation({
            statuses: ["initialized", "pending_verification"],
            olderThanMs: 10 * 60 * 1000,
            limit: 50,
        });

        assert.equal(records.length, 0);
    });

    test("markPaymentResult never downgrades an already-paid record", async () => {
        const { markPaymentResult } = await import("../repository");

        seedRecord(currentDb, {
            conversationId: "PHR-11",
            paymentType: "service",
            status: "paid",
            amount: "100.00",
            currency: "TRY",
            providerToken: "tok-11",
        });

        await markPaymentResult("PHR-11", { status: "failed", providerToken: "tok-11", failureMessage: "late-retry" });

        assert.equal(currentDb.peek("paymentRecords", "PHR-11")?.status, "paid");
    });
});
