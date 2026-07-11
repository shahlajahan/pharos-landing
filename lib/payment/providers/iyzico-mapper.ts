import { PaymentRequest } from "../types";
import { generateConversationId } from "../utils";

export function mapToIyzipayRequest(request: PaymentRequest) {
    const conversationId = generateConversationId();

    return {
        locale: "tr",
        conversationId,

        price: request.amount.toFixed(2),
        paidPrice: request.amount.toFixed(2),

        currency: request.currency,

        basketId: conversationId,

        paymentGroup: "PRODUCT",

        callbackUrl:
            `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment/callback`,

        buyer: {
            id: conversationId,
            name: request.customer.name,
            surname: "-",
            email: request.customer.email,
            gsmNumber: request.customer.phone ?? "",
            identityNumber: "11111111111",
            registrationAddress: "Unknown",
            city: "Istanbul",
            country: "Turkey",
            zipCode: "34000",
        },

        shippingAddress: {
            contactName: request.customer.name,
            city: "Istanbul",
            country: "Turkey",
            address: "Unknown",
            zipCode: "34000",
        },

        billingAddress: {
            contactName: request.customer.name,
            city: "Istanbul",
            country: "Turkey",
            address: "Unknown",
            zipCode: "34000",
        },

        basketItems: [
            {
                id: conversationId,
                name: request.title,
                category1: "Software",
                itemType: "VIRTUAL",
                price: request.amount.toFixed(2),
            },
        ],
    };
}