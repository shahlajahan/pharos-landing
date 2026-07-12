import { createHash } from "crypto";

/**
 * Structured payment event log. Transport is console.log/console.error only
 * — no third-party monitoring dependency is added here. Every event is a
 * single JSON-serializable object per line, so it can be piped into
 * Sentry/Slack/Datadog later by replacing only the `emit` function below,
 * without touching call sites.
 */
export type PaymentLogEvent =
    | "PAYMENT_INITIALIZED"
    | "PAYMENT_INITIALIZE_FAILED"
    | "PAYMENT_CALLBACK_RECEIVED"
    | "PAYMENT_RETRIEVE_RETRY"
    | "PAYMENT_RECORD_RESOLVED"
    | "PAYMENT_RECORD_UPDATED"
    | "PAYMENT_RECORD_NOT_FOUND_HIGH_SEVERITY"
    | "PAYMENT_AMOUNT_MISMATCH"
    | "PAYMENT_RECONCILIATION_RESULT"
    | "PAYMENT_LINK_CONSUMED"
    | "PAYMENT_RATE_LIMITED"
    | "PAYMENT_PERSISTENCE_ERROR";

export type LogSeverity = "info" | "warn" | "high";

export interface PaymentLogFields {
    [key: string]: string | number | boolean | null | undefined;
}

const SEVERITY_TRANSPORT: Record<LogSeverity, (...args: unknown[]) => void> = {
    info: console.log,
    warn: console.warn,
    high: console.error,
};

/**
 * Never log: API keys/secrets, full provider tokens, card data, addresses,
 * identity numbers. Callers must pass only safe fields (amounts, statuses,
 * ids, masked/hashed tokens) — this function does not itself scrub fields,
 * so it is each call site's responsibility not to pass sensitive values.
 */
export function logPaymentEvent(event: PaymentLogEvent, fields: PaymentLogFields = {}, severity: LogSeverity = "info") {
    const transport = SEVERITY_TRANSPORT[severity];
    transport(event, { severity, ...fields });
}

/**
 * One-way, truncated hash of a provider token for log correlation without
 * exposing the token itself. Not reversible; safe to log.
 */
export function hashToken(token: string): string {
    return createHash("sha256").update(token).digest("hex").slice(0, 16);
}
