import { createHash, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";

import { reconcileUnresolvedPayments } from "@/lib/payment/reconciliation";

export const runtime = "nodejs";

/**
 * Constant-time secret comparison. Both sides are hashed to a fixed-length
 * digest first — timingSafeEqual throws on mismatched buffer lengths, and
 * comparing raw variable-length strings would otherwise leak length via
 * early-exit timing.
 */
function safeCompare(a: string, b: string): boolean {
    const hashA = createHash("sha256").update(a).digest();
    const hashB = createHash("sha256").update(b).digest();
    return timingSafeEqual(hashA, hashB);
}

/**
 * Vercel Cron automatically sends `Authorization: Bearer $CRON_SECRET` when
 * CRON_SECRET is set as a project env var and referenced by a `crons` entry
 * in vercel.json — see vercel.json and the final report for exact setup.
 * `x-cron-secret` is accepted too, for manual/script invocation.
 */
function isAuthorized(request: Request): boolean {
    const secret = process.env.CRON_SECRET?.trim();

    if (!secret) {
        // Fail closed: never allow reconciliation to run unauthenticated
        // just because the secret wasn't configured.
        return false;
    }

    const authHeader = request.headers.get("authorization") ?? "";
    const bearerToken = authHeader.replace(/^Bearer\s+/i, "").trim();
    const customHeader = request.headers.get("x-cron-secret")?.trim() ?? "";

    const provided = bearerToken || customHeader;

    if (!provided) {
        return false;
    }

    return safeCompare(provided, secret);
}

async function handleReconcile(request: Request) {
    if (!isAuthorized(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const summary = await reconcileUnresolvedPayments();
        return NextResponse.json({ success: true, summary });
    } catch (error) {
        console.error("PAYMENT_RECONCILIATION_ROUTE_ERROR", {
            message: error instanceof Error ? error.message : String(error),
        });

        return NextResponse.json({ success: false, error: "Reconciliation failed." }, { status: 500 });
    }
}

export async function GET(request: Request) {
    return handleReconcile(request);
}

export async function POST(request: Request) {
    return handleReconcile(request);
}
