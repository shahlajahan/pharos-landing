import { getServiceBySlug } from "../../app/services";
import { getActivePaymentLink } from "./payment-links";
import { DEFAULT_CURRENCY, MAX_PAYMENT_AMOUNT } from "./constants";
import type { InitializePaymentInput, ResolvedPaymentRequest } from "./types";
import { PaymentValidationError } from "./types";
import { hasSafeMonetaryPrecision } from "./utils";

function assertWithinMaxAmount(amount: number): void {
    if (amount > MAX_PAYMENT_AMOUNT) {
        throw new PaymentValidationError("Amount exceeds the maximum allowed payment amount.");
    }
}

/**
 * Resolves the authoritative title/amount/description for a payment request.
 * The browser only ever supplies a serviceSlug or an unguessable
 * referenceId — never a price. Amount and title always come from a
 * server-side catalog or a previously created payment link record. Every
 * resolved amount is checked against MAX_PAYMENT_AMOUNT here, so this check
 * applies regardless of which payment type or caller reaches it.
 */
export async function resolvePaymentRequest(input: InitializePaymentInput): Promise<ResolvedPaymentRequest> {
    if (input.paymentType === "service") {
        const service = getServiceBySlug(input.serviceSlug ?? "");

        if (!service) {
            throw new PaymentValidationError("Selected service was not found.");
        }

        assertWithinMaxAmount(service.price);

        return {
            paymentType: "service",
            title: service.titleTr,
            description: service.titleEn,
            amount: service.price,
            currency: DEFAULT_CURRENCY,
            customer: input.customer,
            referenceId: service.slug,
            metadata: input.metadata,
        };
    }

    const referenceId = input.referenceId ?? "";
    const link = await getActivePaymentLink(referenceId);

    if (!link) {
        throw new PaymentValidationError("Payment link was not found or is no longer active.");
    }

    if (!Number.isFinite(link.amount) || link.amount <= 0 || !hasSafeMonetaryPrecision(link.amount)) {
        throw new PaymentValidationError("Payment link amount is invalid.");
    }

    assertWithinMaxAmount(link.amount);

    return {
        paymentType: link.paymentType,
        title: link.title,
        description: link.description,
        amount: link.amount,
        currency: link.currency,
        customer: input.customer,
        referenceId: link.referenceId,
        metadata: input.metadata,
    };
}
