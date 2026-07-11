export type PaymentType =
    | "service"
    | "deposit"
    | "payment_link";

export type Currency = "TRY";

export interface CustomerInfo {
    name: string;
    email: string;
    phone?: string;
}

export interface PaymentRequest {
    paymentType: PaymentType;

    title: string;
    description?: string;

    amount: number;
    currency: Currency;

    customer: CustomerInfo;

    referenceId?: string;
}

export interface PaymentResponse {
    success: boolean;

    paymentPageUrl?: string;

    token?: string;

    conversationId?: string;

    error?: string;
}