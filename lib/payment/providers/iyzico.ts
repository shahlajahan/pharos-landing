import { createHmac, randomUUID } from "crypto";

import {
    IYZICO_REQUEST_TIMEOUT_MS,
    IYZICO_RETRIEVE_MAX_ATTEMPTS,
    IYZICO_RETRY_BASE_DELAY_MS,
} from "../constants";
import { getIyzicoEnvConfig } from "../env";
import { logPaymentEvent } from "../monitoring";
import { PaymentProviderError } from "../types";

/**
 * Direct HTTP client using iyzico's IYZWSv2 HMAC-SHA256 signing scheme.
 * Deliberately not using the `iyzipay` npm SDK — it previously broke this
 * project's Vercel serverless packaging (see git history: commits
 * 4502134 "Fix iyzipay Vercel packaging" and 6ed9bf5 "replace iyzipay sdk
 * with direct api integration"). Do not reintroduce the SDK here.
 */

const CHECKOUT_FORM_INITIALIZE_PATH = "/payment/iyzipos/checkoutform/initialize/auth/ecom";
const CHECKOUT_FORM_RETRIEVE_PATH = "/payment/iyzipos/checkoutform/auth/ecom/detail";

export interface IyzicoCheckoutInitializeRequest {
    locale: string;
    conversationId: string;
    price: string;
    paidPrice: string;
    currency: string;
    basketId: string;
    paymentGroup: string;
    callbackUrl: string;
    enabledInstallments?: number[];
    buyer: {
        id: string;
        name: string;
        surname: string;
        gsmNumber: string;
        email: string;
        identityNumber: string;
        registrationAddress: string;
        ip: string;
        city: string;
        country: string;
        zipCode: string;
    };
    shippingAddress: {
        contactName: string;
        city: string;
        country: string;
        address: string;
        zipCode: string;
    };
    billingAddress: {
        contactName: string;
        city: string;
        country: string;
        address: string;
        zipCode: string;
    };
    basketItems: {
        id: string;
        name: string;
        category1: string;
        category2?: string;
        itemType: string;
        price: string;
    }[];
}

export interface IyzicoResult {
    status?: string;
    errorMessage?: string;
    errorCode?: string;
    token?: string;
    checkoutFormContent?: string;
    paymentPageUrl?: string;
    paymentStatus?: string;
    paymentId?: string;
    conversationId?: string;
    price?: string | number;
    paidPrice?: string | number;
    currency?: string;
    [key: string]: unknown;
}

function createAuthorizationHeader({
    apiKey,
    body,
    path,
    randomKey,
    secretKey,
}: {
    apiKey: string;
    body: string;
    path: string;
    randomKey: string;
    secretKey: string;
}) {
    const signature = createHmac("sha256", secretKey).update(`${randomKey}${path}${body}`).digest("hex");
    const authorizationString = `apiKey:${apiKey}&randomKey:${randomKey}&signature:${signature}`;
    const encoded = Buffer.from(authorizationString, "utf8").toString("base64");

    return `IYZWSv2 ${encoded}`;
}

function isTransientHttpStatus(status: number): boolean {
    return status === 429 || (status >= 500 && status <= 599);
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Exponential backoff with random jitter so concurrent retries don't synchronize. */
function backoffWithJitter(attempt: number): number {
    const base = IYZICO_RETRY_BASE_DELAY_MS * 2 ** (attempt - 1);
    return base + Math.random() * base * 0.5;
}

/**
 * Every outbound iyzico request gets an explicit timeout — an unbounded
 * fetch can otherwise hang for the lifetime of the serverless function,
 * surfacing a raw platform timeout instead of a clean failure/pending
 * redirect. Network errors, aborts, and transient HTTP statuses (429/5xx)
 * throw a `transient: true` PaymentProviderError so callers can decide
 * whether to retry or show a "verification pending" state instead of a
 * definitive decline. A deterministic business response (e.g. HTTP 200 with
 * `status: "failure"` for an invalid/expired token) is returned normally —
 * it is not an error, it is iyzico's real answer.
 */
async function postIyzico(path: string, payload: object): Promise<IyzicoResult> {
    const config = getIyzicoEnvConfig();
    const body = JSON.stringify(payload);
    const randomKey = `${Date.now()}${randomUUID().replace(/-/g, "")}`;

    let response: Response;

    try {
        response = await fetch(`${config.baseUrl}${path}`, {
            method: "POST",
            headers: {
                Authorization: createAuthorizationHeader({
                    apiKey: config.apiKey,
                    body,
                    path,
                    randomKey,
                    secretKey: config.secretKey,
                }),
                "Content-Type": "application/json",
                "x-iyzi-rnd": randomKey,
            },
            body,
            signal: AbortSignal.timeout(IYZICO_REQUEST_TIMEOUT_MS),
        });
    } catch (error) {
        const timedOut = error instanceof Error && error.name === "TimeoutError";

        console.error("IYZICO_NETWORK_ERROR", {
            path,
            timedOut,
            message: error instanceof Error ? error.message : String(error),
        });

        throw new PaymentProviderError(
            timedOut ? "Payment provider request timed out." : "Could not reach the payment provider.",
            { transient: true },
        );
    }

    if (isTransientHttpStatus(response.status)) {
        console.error("IYZICO_TRANSIENT_HTTP_ERROR", { path, status: response.status });
        throw new PaymentProviderError(`iyzico responded with transient HTTP ${response.status}.`, {
            transient: true,
        });
    }

    const responseText = await response.text();
    const result: IyzicoResult = responseText
        ? JSON.parse(responseText)
        : { status: response.ok ? "success" : "failure" };

    if (!response.ok && !result.errorMessage) {
        result.status = result.status ?? "failure";
        result.errorMessage = `iyzico API request failed with HTTP ${response.status}`;
    }

    return result;
}

export async function initializeCheckoutForm(
    request: IyzicoCheckoutInitializeRequest,
): Promise<IyzicoResult> {
    // Deliberately not retried — retrying a checkout-session creation call
    // risks creating a second, independent session for the same intent.
    const result = await postIyzico(CHECKOUT_FORM_INITIALIZE_PATH, request);

    if (result.status !== "success") {
        console.error("IYZICO_CHECKOUT_INITIALIZE_FAILURE", {
            conversationId: request.conversationId,
            status: result.status,
            errorCode: result.errorCode,
            errorMessage: result.errorMessage,
        });
    }

    return result;
}

/**
 * Retrieves the authoritative checkout form result for a token. The
 * conversationId sent here is only a request-trace id required by iyzico's
 * envelope — it is NOT the original conversationId, and must never be set to
 * the token itself. The response's `conversationId` field is the original
 * one generated at initialize time and is what callers must use to look up
 * their own records.
 *
 * Read-only, so it is the only iyzico call retried on transient failures
 * (bounded attempts, exponential backoff with jitter). If every attempt is
 * transient, the thrown PaymentProviderError has `transient: true` — callers
 * must treat that as "outcome unknown," never as a definitive decline.
 */
export async function retrieveCheckoutForm(token: string): Promise<IyzicoResult> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= IYZICO_RETRIEVE_MAX_ATTEMPTS; attempt += 1) {
        try {
            return await postIyzico(CHECKOUT_FORM_RETRIEVE_PATH, {
                locale: "tr",
                conversationId: randomUUID(),
                token,
            });
        } catch (error) {
            lastError = error;
            const transient = error instanceof PaymentProviderError && error.transient;

            if (!transient || attempt === IYZICO_RETRIEVE_MAX_ATTEMPTS) {
                throw error;
            }

            const delayMs = Math.round(backoffWithJitter(attempt));
            logPaymentEvent("PAYMENT_RETRIEVE_RETRY", { attempt, maxAttempts: IYZICO_RETRIEVE_MAX_ATTEMPTS, delayMs }, "warn");
            await sleep(delayMs);
        }
    }

    throw lastError;
}

export function isPaidCheckout(result: IyzicoResult): boolean {
    return result.status === "success" && result.paymentStatus === "SUCCESS";
}
