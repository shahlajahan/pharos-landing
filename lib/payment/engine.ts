import { PAYMENT_PROVIDER } from "./constants";
import { getCallbackUrl, getIyzicoEnvConfig } from "./env";
import { hashToken, logPaymentEvent } from "./monitoring";
import { markPaymentLinkConsumed } from "./payment-links";
import { mapToIyzicoRequest } from "./providers/iyzico-mapper";
import { initializeCheckoutForm, isPaidCheckout, retrieveCheckoutForm } from "./providers";
import { createInitializedRecord, findPaymentByProviderToken, markPaymentResult } from "./repository";
import { resolvePaymentRequest } from "./resolve";
import type { PaymentResponse } from "./types";
import { PaymentProviderError, PaymentValidationError } from "./types";
import { parseInitializeInput } from "./validator";
import { generateConversationId, hasSafeMonetaryPrecision, normalizeProviderAmount, toIyzicoAmount } from "./utils";

export interface InitializePaymentContext {
    clientIp: string;
}

export async function initializePayment(
    rawBody: unknown,
    context: InitializePaymentContext,
): Promise<PaymentResponse> {
    const input = parseInitializeInput(rawBody);
    const resolved = await resolvePaymentRequest(input);

    if (!Number.isFinite(resolved.amount) || resolved.amount <= 0) {
        throw new PaymentValidationError("Amount must be a positive, finite number.");
    }

    if (!hasSafeMonetaryPrecision(resolved.amount)) {
        throw new PaymentValidationError("Amount precision is not supported.");
    }

    const config = getIyzicoEnvConfig();
    const callbackUrl = getCallbackUrl();
    const conversationId = generateConversationId();

    const iyzicoRequest = mapToIyzicoRequest(resolved, {
        conversationId,
        callbackUrl,
        clientIp: context.clientIp,
        isSandbox: config.isSandbox,
    });

    const result = await initializeCheckoutForm(iyzicoRequest);

    if (result.status !== "success" || !result.token) {
        logPaymentEvent("PAYMENT_INITIALIZE_FAILED", { conversationId, paymentType: resolved.paymentType }, "warn");

        return {
            success: false,
            error: "Payment could not be started. Please try again.",
        };
    }

    await createInitializedRecord({
        conversationId,
        referenceId: resolved.referenceId,
        paymentType: resolved.paymentType,
        title: resolved.title,
        amount: toIyzicoAmount(resolved.amount),
        currency: resolved.currency,
        customerEmail: resolved.customer.email,
        customerName: `${resolved.customer.firstName} ${resolved.customer.lastName}`,
        providerToken: result.token,
    });

    logPaymentEvent("PAYMENT_INITIALIZED", {
        conversationId,
        paymentType: resolved.paymentType,
        tokenHash: hashToken(result.token),
    });

    return {
        success: true,
        token: result.token,
        paymentPageUrl: result.paymentPageUrl,
        checkoutFormContent: result.checkoutFormContent,
        conversationId,
    };
}

export type PaymentOutcome = "paid" | "failed" | "pending_verification";

export interface FinalizedPayment {
    outcome: PaymentOutcome;
    conversationId?: string;
    referenceId?: string;
    reason?: string;
}

/**
 * Retrieves the authoritative result for a token from iyzico and finalizes
 * local state. This is the only place a payment is marked paid — callers
 * must never infer success from being reached, and no page may treat a
 * redirect alone as proof of payment. Shared by the live callback route and
 * by reconciliation (lib/payment/reconciliation.ts) so both paths apply the
 * exact same amount-verification and link-consumption logic.
 *
 * Three possible outcomes:
 *  - "paid": iyzico confirmed success AND the confirmed amount/currency
 *    matches our own record.
 *  - "failed": iyzico gave a definitive, deterministic non-success result.
 *  - "pending_verification": the real outcome is not yet known — either the
 *    retrieve call exhausted its retries on a transient failure, or iyzico
 *    reported success but the confirmed amount/currency didn't match our
 *    record. Never treated as paid; always redirected to a pending/awaiting
 *    state, never to a definitive decline.
 */
export async function retrieveAndFinalizePayment(token: string): Promise<FinalizedPayment> {
    if (!token) {
        return { outcome: "failed", reason: "missing-token" };
    }

    // Config errors (missing credentials) propagate to the caller unchanged.
    getIyzicoEnvConfig();

    let result;

    try {
        result = await retrieveCheckoutForm(token);
    } catch (error) {
        if (error instanceof PaymentProviderError && error.transient) {
            const record = await findPaymentByProviderToken(PAYMENT_PROVIDER, token);

            if (record) {
                await markPaymentResult(record.conversationId, {
                    status: "pending_verification",
                    providerToken: token,
                    failureMessage: "retrieve-transient-failure",
                });
            } else {
                logPaymentEvent(
                    "PAYMENT_RECORD_NOT_FOUND_HIGH_SEVERITY",
                    { reason: "transient-retrieve-failure-no-record", tokenHash: hashToken(token) },
                    "high",
                );
            }

            return {
                outcome: "pending_verification",
                conversationId: record?.conversationId,
                referenceId: record?.referenceId,
                reason: "verification-in-progress",
            };
        }

        throw error;
    }

    const success = isPaidCheckout(result);
    const record = await findPaymentByProviderToken(PAYMENT_PROVIDER, token);

    if (!record) {
        logPaymentEvent(
            "PAYMENT_RECORD_NOT_FOUND_HIGH_SEVERITY",
            { reason: "no-internal-record", success, tokenHash: hashToken(token) },
            "high",
        );

        return {
            outcome: success ? "paid" : "failed",
            reason: success ? undefined : (result.errorMessage ?? "payment-not-successful"),
        };
    }

    logPaymentEvent("PAYMENT_RECORD_RESOLVED", { conversationId: record.conversationId, status: record.status });

    if (!success) {
        await markPaymentResult(record.conversationId, {
            status: "failed",
            providerToken: token,
            failureCode: result.errorCode,
            failureMessage: result.errorMessage ?? result.paymentStatus,
        });

        return {
            outcome: "failed",
            conversationId: record.conversationId,
            referenceId: record.referenceId,
            reason: result.errorMessage ?? "payment-not-successful",
        };
    }

    // Phase 5: cross-check iyzico's confirmed amount/currency against our own
    // record before ever marking paid. String comparison only — never float equality.
    const confirmedAmount = normalizeProviderAmount(result.paidPrice ?? result.price);
    const confirmedCurrency = typeof result.currency === "string" ? result.currency.toUpperCase() : undefined;
    const amountMatches = confirmedAmount !== null && confirmedAmount === record.amount;
    const currencyMatches = confirmedCurrency !== undefined && confirmedCurrency === record.currency;

    if (!amountMatches || !currencyMatches) {
        logPaymentEvent(
            "PAYMENT_AMOUNT_MISMATCH",
            {
                conversationId: record.conversationId,
                expectedAmount: record.amount,
                confirmedAmount: confirmedAmount ?? "unknown",
                expectedCurrency: record.currency,
                confirmedCurrency: confirmedCurrency ?? "unknown",
            },
            "high",
        );

        await markPaymentResult(record.conversationId, {
            status: "pending_verification",
            providerToken: token,
            failureMessage: "amount-or-currency-mismatch",
        });

        return {
            outcome: "pending_verification",
            conversationId: record.conversationId,
            referenceId: record.referenceId,
            reason: "amount-verification-pending",
        };
    }

    await markPaymentResult(record.conversationId, {
        status: "paid",
        providerToken: token,
        providerPaymentId: result.paymentId,
    });

    if (record.paymentType !== "service" && record.referenceId) {
        await markPaymentLinkConsumed(record.referenceId, {
            conversationId: record.conversationId,
            provider: PAYMENT_PROVIDER,
            providerPaymentId: result.paymentId,
        });
    }

    return {
        outcome: "paid",
        conversationId: record.conversationId,
        referenceId: record.referenceId,
    };
}
