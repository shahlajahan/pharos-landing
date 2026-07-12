import { logPaymentEvent } from "./monitoring";

export interface RateLimitResult {
    allowed: boolean;
    retryAfterSeconds?: number;
}

export interface RateLimiter {
    check(key: string, limit: number, windowSeconds: number): Promise<RateLimitResult>;
}

/**
 * In-process fixed-window limiter. NOT safe as the sole protection in a real
 * multi-instance serverless deployment (Vercel functions do not share
 * memory across instances/regions, so each instance enforces its own
 * independent counter — an attacker distributed across instances can exceed
 * the intended limit by a factor of however many instances are warm).
 *
 * This is a best-effort fallback for single-instance/dev use, and still
 * meaningfully slows down a single hot instance being hammered. For real
 * production protection, wire in a durable backend (Vercel KV / Upstash
 * Redis / similar) behind the same RateLimiter interface — see
 * getRateLimiter() below for exactly where to plug it in.
 */
export class InMemoryRateLimiter implements RateLimiter {
    private readonly buckets = new Map<string, { count: number; resetAt: number }>();

    async check(key: string, limit: number, windowSeconds: number): Promise<RateLimitResult> {
        const now = Date.now();
        const existing = this.buckets.get(key);

        if (!existing || existing.resetAt <= now) {
            this.buckets.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
            return { allowed: true };
        }

        if (existing.count >= limit) {
            return { allowed: false, retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000) };
        }

        existing.count += 1;
        return { allowed: true };
    }
}

let sharedLimiter: RateLimiter | null = null;

/**
 * Returns the process-wide rate limiter. Currently always the in-memory
 * fallback — no durable provider is configured in this deployment. This is
 * the single place to swap in a durable implementation (satisfying the same
 * RateLimiter interface) once one is provisioned; no call site changes.
 */
export function getRateLimiter(): RateLimiter {
    if (!sharedLimiter) {
        sharedLimiter = new InMemoryRateLimiter();
    }

    return sharedLimiter;
}

export interface EnforceRateLimitOptions {
    key: string;
    limit: number;
    windowSeconds: number;
    event: string;
}

/** Returns true if the request should be rejected (rate limited). Logs on rejection. */
export async function isRateLimited(options: EnforceRateLimitOptions): Promise<RateLimitResult> {
    const result = await getRateLimiter().check(options.key, options.limit, options.windowSeconds);

    if (!result.allowed) {
        logPaymentEvent(
            "PAYMENT_RATE_LIMITED",
            { context: options.event, retryAfterSeconds: result.retryAfterSeconds ?? null },
            "warn",
        );
    }

    return result;
}
