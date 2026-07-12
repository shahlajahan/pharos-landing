import { NextRequest, NextResponse } from "next/server";

import { getClientIp } from "@/lib/payment/client-ip";
import { initializePayment } from "@/lib/payment/engine";
import { isRateLimited } from "@/lib/payment/rate-limit";
import { PaymentConfigError, PaymentProviderError, PaymentValidationError } from "@/lib/payment/types";

export const runtime = "nodejs";

/** IP + declared identifier (service slug or payment-link reference), so one IP can't exhaust a single target either. */
function buildRateLimitKey(clientIp: string, body: unknown): string {
    const identifier =
        body && typeof body === "object" && body !== null
            ? String((body as Record<string, unknown>).serviceSlug ?? (body as Record<string, unknown>).referenceId ?? "unknown")
            : "unknown";

    return `initialize:${clientIp}:${identifier}`;
}

export async function POST(request: NextRequest) {
    let body: unknown;

    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ success: false, error: "Request body must be valid JSON." }, { status: 400 });
    }

    const clientIp = getClientIp(request);

    const rateLimit = await isRateLimited({
        key: buildRateLimitKey(clientIp, body),
        limit: 5,
        windowSeconds: 60,
        event: "initialize",
    });

    if (!rateLimit.allowed) {
        return NextResponse.json(
            { success: false, error: "Too many requests. Please try again shortly." },
            { status: 429, headers: rateLimit.retryAfterSeconds ? { "Retry-After": String(rateLimit.retryAfterSeconds) } : undefined },
        );
    }

    try {
        const response = await initializePayment(body, { clientIp });

        if (!response.success) {
            return NextResponse.json(response, { status: 502 });
        }

        return NextResponse.json(response);
    } catch (error) {
        if (error instanceof PaymentValidationError) {
            return NextResponse.json({ success: false, error: error.message }, { status: 400 });
        }

        if (error instanceof PaymentConfigError) {
            console.error("PAYMENT_INITIALIZE_CONFIG_ERROR", { message: error.message });
            return NextResponse.json(
                { success: false, error: "Payment is temporarily unavailable. Please try again later." },
                { status: 500 },
            );
        }

        if (error instanceof PaymentProviderError) {
            return NextResponse.json(
                { success: false, error: "Payment could not be started. Please try again." },
                { status: 502 },
            );
        }

        console.error("PAYMENT_INITIALIZE_UNEXPECTED_ERROR", {
            message: error instanceof Error ? error.message : String(error),
        });

        return NextResponse.json({ success: false, error: "Unexpected server error." }, { status: 500 });
    }
}
