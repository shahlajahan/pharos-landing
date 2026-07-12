import { NextRequest, NextResponse } from "next/server";

import { createContactRequest } from "@/lib/contact/repository";
import { ContactValidationError } from "@/lib/contact/types";
import { parseContactRequestInput } from "@/lib/contact/validator";
import { getClientIp } from "@/lib/payment/client-ip";
import { isRateLimited } from "@/lib/payment/rate-limit";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
    let body: unknown;

    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ success: false, error: "Request body must be valid JSON." }, { status: 400 });
    }

    const clientIp = getClientIp(request);

    const rateLimit = await isRateLimited({
        key: `contact:${clientIp}`,
        limit: 5,
        windowSeconds: 300,
        event: "contact",
    });

    if (!rateLimit.allowed) {
        return NextResponse.json(
            { success: false, error: "Too many requests. Please try again later." },
            {
                status: 429,
                headers: rateLimit.retryAfterSeconds ? { "Retry-After": String(rateLimit.retryAfterSeconds) } : undefined,
            },
        );
    }

    try {
        const input = parseContactRequestInput(body);
        await createContactRequest(input);

        return NextResponse.json({ success: true });
    } catch (error) {
        if (error instanceof ContactValidationError) {
            return NextResponse.json({ success: false, error: error.message }, { status: 400 });
        }

        // Never log full form contents (name/email/message) — only the failure reason.
        console.error("CONTACT_REQUEST_FAILED", {
            message: error instanceof Error ? error.message : String(error),
        });

        return NextResponse.json(
            { success: false, error: "Your message could not be sent. Please try again later." },
            { status: 500 },
        );
    }
}
