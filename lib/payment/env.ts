import { PaymentConfigError } from "./types";

export interface IyzicoEnvConfig {
    apiKey: string;
    secretKey: string;
    baseUrl: string;
    isSandbox: boolean;
}

/** Validated at request time (not module load) so unrelated pages never crash from missing payment env. */
export function getIyzicoEnvConfig(): IyzicoEnvConfig {
    const apiKey = process.env.IYZICO_API_KEY?.trim();
    const secretKey = process.env.IYZICO_SECRET_KEY?.trim();
    const baseUrl = process.env.IYZICO_BASE_URL?.trim();

    if (!apiKey || !secretKey || !baseUrl) {
        throw new PaymentConfigError("Payment provider credentials are not configured.");
    }

    return {
        apiKey,
        secretKey,
        baseUrl: baseUrl.replace(/\/$/, ""),
        isSandbox: baseUrl.includes("sandbox"),
    };
}

export function getCallbackUrl(): string {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

    if (!siteUrl) {
        throw new PaymentConfigError("Site URL is not configured; cannot build a payment callback URL.");
    }

    let parsed: URL;

    try {
        parsed = new URL(siteUrl);
    } catch {
        throw new PaymentConfigError("Site URL is not configured; cannot build a payment callback URL.");
    }

    if (parsed.protocol !== "https:" && !parsed.hostname.includes("localhost")) {
        throw new PaymentConfigError("Site URL must use HTTPS for payment callbacks.");
    }

    return `${siteUrl.replace(/\/$/, "")}/api/payment/callback`;
}
