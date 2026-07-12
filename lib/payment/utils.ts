import { randomBytes } from "crypto";

import { CONVERSATION_PREFIX } from "./constants";

/**
 * Internal conversation id. Never derived from user input — timestamp plus a
 * cryptographically random suffix, prefixed so it is recognizable as ours in
 * iyzico dashboards and logs.
 */
export function generateConversationId() {
    const timestamp = Date.now();
    const random = randomBytes(6).toString("hex").toUpperCase();

    return `${CONVERSATION_PREFIX}-${timestamp}-${random}`;
}

/** Unguessable reference id for private payment links / deposit records. */
export function generatePaymentReferenceId() {
    return randomBytes(18).toString("base64url");
}

/**
 * Converts a JS number amount into the deterministic decimal string iyzico
 * expects (e.g. 25000 -> "25000.00", 199.9 -> "199.90"). Avoids
 * floating-point round-trip issues by working in integer cents rather than
 * calling toFixed on the raw float.
 */
export function toIyzicoAmount(amount: number): string {
    if (!Number.isFinite(amount)) {
        throw new RangeError("Amount must be a finite number.");
    }

    const cents = Math.round(amount * 100);
    const isNegative = cents < 0;
    const absoluteCents = Math.abs(cents);
    const wholePart = Math.floor(absoluteCents / 100);
    const centPart = String(absoluteCents % 100).padStart(2, "0");

    return `${isNegative ? "-" : ""}${wholePart}.${centPart}`;
}

/** True if `amount` round-trips through cents without loss (rejects excessive precision). */
export function hasSafeMonetaryPrecision(amount: number): boolean {
    if (!Number.isFinite(amount)) {
        return false;
    }

    const cents = amount * 100;
    return Math.abs(cents - Math.round(cents)) < 1e-6;
}

/**
 * Normalizes a provider-confirmed amount (string or number, as iyzico
 * returns it) into the same canonical decimal string produced by
 * toIyzicoAmount, so it can be string-compared against a stored amount
 * without ever using floating-point equality. Returns null if the value is
 * missing or not a finite number.
 */
export function normalizeProviderAmount(value: string | number | undefined): string | null {
    if (value === undefined) {
        return null;
    }

    const numeric = typeof value === "number" ? value : Number(value);

    if (!Number.isFinite(numeric)) {
        return null;
    }

    return toIyzicoAmount(numeric);
}
