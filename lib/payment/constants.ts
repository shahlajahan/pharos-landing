export const DEFAULT_CURRENCY = "TRY";

export const CONVERSATION_PREFIX = "PHR";

export const PAYMENT_PROVIDER = "iyzico";

/** Hard ceiling enforced everywhere an amount is accepted or loaded (initialize, resolve, payment-link creation). */
export const MAX_PAYMENT_AMOUNT = 10_000_000;

export const PAYMENT_TYPES = ["service", "deposit", "payment_link"] as const;

/**
 * Default validity window for a deposit/payment_link record created without
 * an explicit expiry. 14 days balances two needs: private payment links are
 * usually sent and paid within days, but deposit/milestone invoices can lag
 * behind a signed contract — 14 days covers realistic follow-up without
 * leaving links payable indefinitely.
 */
export const DEFAULT_PAYMENT_LINK_EXPIRY_DAYS = 14;

/** A stale "initialized" record older than this is eligible for reconciliation. */
export const RECONCILIATION_MIN_AGE_MINUTES = 10;

/** A stale "initialized" record older than this with a confirmed non-paid retrieve is marked failed (abandoned). */
export const ABANDONED_CHECKOUT_AGE_HOURS = 24;

export const IYZICO_REQUEST_TIMEOUT_MS = 8_000;

export const IYZICO_RETRIEVE_MAX_ATTEMPTS = 3;

export const IYZICO_RETRY_BASE_DELAY_MS = 300;
