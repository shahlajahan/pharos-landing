import type { IyzicoCheckoutInitializeRequest } from "./iyzico";
import { PaymentValidationError, type ResolvedPaymentRequest } from "../types";
import { toIyzicoAmount } from "../utils";

/**
 * Sandbox-only defense-in-depth fallback. Under the normal flow this is
 * never reached — lib/payment/validator.ts already requires a correctly
 * shaped identityNumber for every CustomerType before a request gets here.
 * This exists only to guarantee that if some future caller ever bypasses
 * that validation, production still fails closed (throws) rather than
 * silently sending a fake identity number to iyzico. This is iyzico's own
 * documented sandbox convention — it must never be used outside of sandbox.
 */
const SANDBOX_FALLBACK_IDENTITY_NUMBER = "11111111111";

export interface MapToIyzicoRequestOptions {
    conversationId: string;
    callbackUrl: string;
    clientIp: string;
    isSandbox: boolean;
}

export function mapToIyzicoRequest(
    request: ResolvedPaymentRequest,
    options: MapToIyzicoRequestOptions,
): IyzicoCheckoutInitializeRequest {
    const { conversationId, callbackUrl, clientIp, isSandbox } = options;
    const { customer } = request;

    let identityNumber = customer.identityNumber;

    if (!identityNumber) {
        if (!isSandbox) {
            throw new PaymentValidationError("Customer identity number is required.");
        }

        identityNumber = SANDBOX_FALLBACK_IDENTITY_NUMBER;
    }

    const price = toIyzicoAmount(request.amount);
    const contactName = `${customer.firstName} ${customer.lastName}`;

    return {
        locale: "tr",
        conversationId,
        price,
        paidPrice: price,
        currency: request.currency,
        basketId: conversationId,
        paymentGroup: "PRODUCT",
        callbackUrl,
        buyer: {
            id: `buyer-${conversationId}`,
            name: customer.firstName,
            surname: customer.lastName,
            gsmNumber: customer.phone,
            email: customer.email,
            identityNumber,
            registrationAddress: customer.address,
            ip: clientIp,
            city: customer.city,
            country: customer.country,
            zipCode: customer.zipCode,
        },
        shippingAddress: {
            contactName,
            city: customer.city,
            country: customer.country,
            address: customer.address,
            zipCode: customer.zipCode,
        },
        billingAddress: {
            contactName,
            city: customer.city,
            country: customer.country,
            address: customer.address,
            zipCode: customer.zipCode,
        },
        basketItems: [
            {
                id: request.referenceId ?? conversationId,
                name: request.title,
                category1: "Software Services",
                category2: "Pharos Teknoloji",
                itemType: "VIRTUAL",
                price,
            },
        ],
    };
}
