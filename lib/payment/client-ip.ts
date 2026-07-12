/**
 * Trust assumptions for x-forwarded-for on this deployment:
 *
 * On Vercel, incoming requests reach the Next.js runtime through Vercel's
 * own edge network, which sets x-forwarded-for to the real client IP
 * (appending to, rather than blindly trusting, any client-supplied value
 * for requests that reach Vercel's edge directly). For a standard Vercel
 * deployment with no additional reverse proxy in front of it, the FIRST
 * entry in x-forwarded-for is Vercel's own determination of the client IP,
 * not attacker-controlled.
 *
 * This assumption breaks if this app is ever deployed behind a DIFFERENT
 * reverse proxy/CDN that appends to (rather than overwrites) an
 * already-attacker-supplied header — in that configuration the first entry
 * could be attacker-controlled. If that ever changes, this function must be
 * updated to read from whatever header/position that specific proxy
 * guarantees (e.g. a dedicated `cf-connecting-ip` on Cloudflare).
 *
 * Used for: (1) the `buyer.ip` field sent to iyzico for fraud scoring —
 * best-effort, not a hard security control — and (2) rate-limit keys, where
 * a wrong IP only affects fairness of the limit, not correctness/security of
 * the payment flow itself (amount/authorization never depend on IP).
 */
export function getClientIp(request: Request): string {
    const forwardedFor = request.headers.get("x-forwarded-for");

    if (forwardedFor) {
        return forwardedFor.split(",")[0]?.trim() || "127.0.0.1";
    }

    return request.headers.get("x-real-ip") ?? "127.0.0.1";
}
