import { NextResponse } from "next/server";

import { getClientIp } from "@/lib/payment/client-ip";
import { retrieveAndFinalizePayment } from "@/lib/payment/engine";
import { hashToken, logPaymentEvent } from "@/lib/payment/monitoring";
import { isRateLimited } from "@/lib/payment/rate-limit";
import { PaymentConfigError } from "@/lib/payment/types";

export const runtime = "nodejs";

type CallbackPayload = Record<string, string>;
type SafeRedirectPath = "/payment-success" | "/payment-failed" | "/payment-pending";

function toPayloadValue(value: unknown): string | undefined {
    if (value === null || value === undefined) {
        return undefined;
    }

    if (Array.isArray(value)) {
        return toPayloadValue(value[0]);
    }

    if (typeof value === "object") {
        return undefined;
    }

    return String(value);
}

function addSearchParams(payload: CallbackPayload, searchParams: URLSearchParams) {
    searchParams.forEach((value, key) => {
        payload[key] = value;
    });
}

async function readCallbackPayload(request: Request): Promise<CallbackPayload> {
    const payload: CallbackPayload = {};
    const requestUrl = new URL(request.url);

    addSearchParams(payload, requestUrl.searchParams);

    if (request.method === "GET" || request.method === "HEAD") {
        return payload;
    }

    const contentType = request.headers.get("content-type") ?? "";

    try {
        if (contentType.includes("application/json")) {
            const body = (await request.json()) as Record<string, unknown>;

            Object.entries(body).forEach(([key, value]) => {
                const payloadValue = toPayloadValue(value);

                if (payloadValue !== undefined) {
                    payload[key] = payloadValue;
                }
            });

            return payload;
        }

        if (
            contentType.includes("application/x-www-form-urlencoded") ||
            contentType.includes("multipart/form-data")
        ) {
            const formData = await request.formData();

            formData.forEach((value, key) => {
                if (typeof value === "string") {
                    payload[key] = value;
                }
            });

            return payload;
        }

        const rawBody = await request.text();

        if (!rawBody.trim()) {
            return payload;
        }

        try {
            const body = JSON.parse(rawBody) as Record<string, unknown>;

            Object.entries(body).forEach(([key, value]) => {
                const payloadValue = toPayloadValue(value);

                if (payloadValue !== undefined) {
                    payload[key] = payloadValue;
                }
            });
        } catch {
            addSearchParams(payload, new URLSearchParams(rawBody));
        }
    } catch (error) {
        console.error("PAYMENT_CALLBACK_PAYLOAD_READ_FAILED", {
            message: error instanceof Error ? error.message : String(error),
        });
    }

    return payload;
}

function getToken(payload: CallbackPayload): string {
    return payload.token?.trim() || payload.paymentToken?.trim() || payload.checkoutFormToken?.trim() || "";
}

/** Only ever redirects to a fixed, literal internal path — never attacker-influenced, so no open redirect is possible. */
function redirectToSafePath(
    request: Request,
    pathname: SafeRedirectPath,
    params: Record<string, string | undefined>,
) {
    const destination = new URL(pathname, request.url);

    Object.entries(params).forEach(([key, value]) => {
        if (value) {
            destination.searchParams.set(key, value);
        }
    });

    return NextResponse.redirect(destination, { status: 303 });
}

async function handlePaymentCallback(request: Request) {
    const payload = await readCallbackPayload(request);
    const token = getToken(payload);
    const clientIp = getClientIp(request);

    logPaymentEvent("PAYMENT_CALLBACK_RECEIVED", {
        method: request.method,
        hasToken: Boolean(token),
        tokenHash: token ? hashToken(token) : undefined,
    });

    const rateLimit = await isRateLimited({
        key: `callback:${token ? hashToken(token) : clientIp}`,
        limit: 20,
        windowSeconds: 60,
        event: "callback",
    });

    if (!rateLimit.allowed) {
        return NextResponse.json({ error: "Too many requests." }, { status: 429 });
    }

    try {
        const finalized = await retrieveAndFinalizePayment(token);
        const ref = finalized.referenceId ?? finalized.conversationId;

        if (finalized.outcome === "paid") {
            logPaymentEvent("PAYMENT_CALLBACK_RECEIVED", { outcome: "paid", conversationId: finalized.conversationId });
            return redirectToSafePath(request, "/payment-success", { ref });
        }

        if (finalized.outcome === "pending_verification") {
            console.log("PAYMENT_PENDING", { reason: finalized.reason, conversationId: finalized.conversationId });
            return redirectToSafePath(request, "/payment-pending", { ref });
        }

        console.log("PAYMENT_FAILED", { reason: finalized.reason, conversationId: finalized.conversationId });
        return redirectToSafePath(request, "/payment-failed", { ref, reason: finalized.reason });
    } catch (error) {
        const reason = error instanceof PaymentConfigError ? "provider-config-error" : "verification-error";

        console.error("PAYMENT_CALLBACK_FAILED", {
            reason,
            message: error instanceof Error ? error.message : String(error),
        });

        return redirectToSafePath(request, "/payment-failed", { reason });
    }
}

export async function GET(request: Request) {
    return handlePaymentCallback(request);
}

export async function POST(request: Request) {
    return handlePaymentCallback(request);
}
