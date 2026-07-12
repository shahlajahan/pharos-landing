export type PaymentType = "service" | "deposit" | "payment_link";

export type Currency = "TRY";

/**
 * pending_verification: retrieve was inconclusive (transient provider error,
 * or an amount/currency mismatch) — the payment's real outcome is not yet
 * known and must be re-checked by reconciliation, never treated as paid.
 */
export type PaymentRecordStatus = "initialized" | "paid" | "failed" | "cancelled" | "pending_verification";

/**
 * Determines which identity/tax field iyzico requires and its validation
 * shape. iyzico's Checkout Form API requires a non-empty `identityNumber`
 * for every buyer — there is no way to omit it — so the UI must always mark
 * whichever field is required for the selected type, never label it
 * optional. See lib/payment/providers/iyzico-mapper.ts.
 */
export type CustomerType = "tr_individual" | "foreign_individual" | "company";

export interface CustomerInfo {
    customerType: CustomerType;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    /**
     * Required for tr_individual (TC Kimlik No) and company (vergi
     * numarası); required for foreign_individual too (iyzico requires a
     * value), but format is validated more permissively (passport/foreign ID
     * number). Never a fake/placeholder value outside Sandbox.
     */
    identityNumber: string;
    address: string;
    city: string;
    country: string;
    zipCode: string;
}

/** Raw shape accepted at the API boundary. Trusted only after validator.ts parses it. */
export interface InitializePaymentInput {
    paymentType: PaymentType;
    serviceSlug?: string;
    referenceId?: string;
    customer: CustomerInfo;
    metadata?: Record<string, string>;
}

/** Server-resolved, authoritative payment request. Amount/title never come from the browser. */
export interface ResolvedPaymentRequest {
    paymentType: PaymentType;
    title: string;
    description?: string;
    amount: number;
    currency: Currency;
    customer: CustomerInfo;
    referenceId?: string;
    metadata?: Record<string, string>;
}

export interface PaymentResponse {
    success: boolean;
    token?: string;
    paymentPageUrl?: string;
    checkoutFormContent?: string;
    conversationId?: string;
    error?: string;
}

export class PaymentValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "PaymentValidationError";
    }
}

export class PaymentConfigError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "PaymentConfigError";
    }
}

export class PaymentProviderError extends Error {
    /** True when the failure is transient (network/timeout/429/5xx) and safe to retry or reconcile later. */
    readonly transient: boolean;

    constructor(message: string, options?: { transient?: boolean }) {
        super(message);
        this.name = "PaymentProviderError";
        this.transient = options?.transient ?? false;
    }
}

export class RateLimitError extends Error {
    readonly retryAfterSeconds: number;

    constructor(message: string, retryAfterSeconds: number) {
        super(message);
        this.name = "RateLimitError";
        this.retryAfterSeconds = retryAfterSeconds;
    }
}
