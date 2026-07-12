import { test, describe } from "node:test";
import assert from "node:assert/strict";

import {
    toIyzicoAmount,
    hasSafeMonetaryPrecision,
    normalizeProviderAmount,
    generateConversationId,
    generatePaymentReferenceId,
} from "../utils";
import { parseInitializeInput } from "../validator";
import { mapToIyzicoRequest } from "../providers/iyzico-mapper";
import { isPaidCheckout } from "../providers/iyzico";
import { InMemoryRateLimiter } from "../rate-limit";
import { hashToken } from "../monitoring";
import { PaymentValidationError } from "../types";
import { resolvePaymentRequest } from "../resolve";
import { createPaymentLink } from "../payment-links";
import { MAX_PAYMENT_AMOUNT } from "../constants";

describe("money normalization", () => {
    test("toIyzicoAmount formats whole and fractional amounts deterministically", () => {
        assert.equal(toIyzicoAmount(25000), "25000.00");
        assert.equal(toIyzicoAmount(199.9), "199.90");
        assert.equal(toIyzicoAmount(0.1 + 0.2), "0.30"); // classic float trap, must not leak
    });

    test("toIyzicoAmount rejects non-finite input", () => {
        assert.throws(() => toIyzicoAmount(Infinity), RangeError);
        assert.throws(() => toIyzicoAmount(NaN), RangeError);
    });

    test("hasSafeMonetaryPrecision rejects sub-cent precision", () => {
        assert.equal(hasSafeMonetaryPrecision(15000), true);
        assert.equal(hasSafeMonetaryPrecision(15000.5), true);
        assert.equal(hasSafeMonetaryPrecision(15000.005), false);
    });

    test("normalizeProviderAmount string-comparable against toIyzicoAmount output, no float equality", () => {
        assert.equal(normalizeProviderAmount("15000.00"), "15000.00");
        assert.equal(normalizeProviderAmount(15000), "15000.00");
        assert.equal(normalizeProviderAmount(undefined), null);
        assert.equal(normalizeProviderAmount("not-a-number"), null);
        // A provider value that is numerically different must produce a different normalized string.
        assert.notEqual(normalizeProviderAmount(15000.01), toIyzicoAmount(15000));
    });
});

describe("id generation", () => {
    test("generateConversationId carries the PHR- prefix and unique suffixes", () => {
        const a = generateConversationId();
        const b = generateConversationId();
        assert.match(a, /^PHR-\d+-[0-9A-F]+$/);
        assert.notEqual(a, b);
    });

    test("generatePaymentReferenceId is unguessable length/charset and unique", () => {
        const a = generatePaymentReferenceId();
        const b = generatePaymentReferenceId();
        assert.equal(a.length >= 20, true);
        assert.notEqual(a, b);
    });
});

describe("validator: customer type / identity number contract", () => {
    const baseCustomer = {
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        phone: "+905551234567",
        address: "Test Sk. No:1",
        city: "Istanbul",
        country: "Turkey",
        zipCode: "34000",
    };

    test("tr_individual requires exactly 11 digits", () => {
        assert.throws(
            () =>
                parseInitializeInput({
                    paymentType: "service",
                    serviceSlug: "web-solutions",
                    customer: { ...baseCustomer, customerType: "tr_individual", identityNumber: "123" },
                }),
            PaymentValidationError,
        );

        const parsed = parseInitializeInput({
            paymentType: "service",
            serviceSlug: "web-solutions",
            customer: { ...baseCustomer, customerType: "tr_individual", identityNumber: "12345678901" },
        });
        assert.equal(parsed.customer.identityNumber, "12345678901");
    });

    test("company requires exactly 10 digits (vergi numarası)", () => {
        assert.throws(
            () =>
                parseInitializeInput({
                    paymentType: "service",
                    serviceSlug: "web-solutions",
                    customer: { ...baseCustomer, customerType: "company", identityNumber: "123456789012" },
                }),
            PaymentValidationError,
        );

        const parsed = parseInitializeInput({
            paymentType: "service",
            serviceSlug: "web-solutions",
            customer: { ...baseCustomer, customerType: "company", identityNumber: "1234567890" },
        });
        assert.equal(parsed.customer.identityNumber, "1234567890");
    });

    test("foreign_individual accepts a real alphanumeric passport/ID number, not a fake placeholder", () => {
        const parsed = parseInitializeInput({
            paymentType: "service",
            serviceSlug: "web-solutions",
            customer: { ...baseCustomer, customerType: "foreign_individual", identityNumber: "AB1234567" },
        });
        assert.equal(parsed.customer.identityNumber, "AB1234567");

        assert.throws(
            () =>
                parseInitializeInput({
                    paymentType: "service",
                    serviceSlug: "web-solutions",
                    customer: { ...baseCustomer, customerType: "foreign_individual", identityNumber: "" },
                }),
            PaymentValidationError,
        );
    });

    test("missing/invalid customerType is rejected", () => {
        assert.throws(
            () =>
                parseInitializeInput({
                    paymentType: "service",
                    serviceSlug: "web-solutions",
                    customer: { ...baseCustomer, identityNumber: "12345678901" },
                }),
            PaymentValidationError,
        );
    });
});

describe("iyzico mapper: identity number handling", () => {
    const resolved = {
        paymentType: "service" as const,
        title: "Web Çözümleri",
        amount: 15000,
        currency: "TRY" as const,
        customer: {
            customerType: "tr_individual" as const,
            firstName: "Test",
            lastName: "User",
            email: "test@example.com",
            phone: "+905551234567",
            address: "Test Sk. No:1",
            city: "Istanbul",
            country: "Turkey",
            zipCode: "34000",
            identityNumber: "",
        },
        referenceId: "web-solutions",
    };

    test("production throws if identityNumber is somehow empty (defense in depth)", () => {
        assert.throws(
            () =>
                mapToIyzicoRequest(resolved, {
                    conversationId: "PHR-1-AA",
                    callbackUrl: "https://example.com/api/payment/callback",
                    clientIp: "127.0.0.1",
                    isSandbox: false,
                }),
            PaymentValidationError,
        );
    });

    test("sandbox falls back to the documented sandbox identity number when empty", () => {
        const request = mapToIyzicoRequest(resolved, {
            conversationId: "PHR-1-AA",
            callbackUrl: "https://example.com/api/payment/callback",
            clientIp: "127.0.0.1",
            isSandbox: true,
        });
        assert.equal(request.buyer.identityNumber, "11111111111");
    });

    test("a real identityNumber passes through unchanged in production", () => {
        const request = mapToIyzicoRequest(
            { ...resolved, customer: { ...resolved.customer, identityNumber: "12345678901" } },
            {
                conversationId: "PHR-1-AA",
                callbackUrl: "https://example.com/api/payment/callback",
                clientIp: "127.0.0.1",
                isSandbox: false,
            },
        );
        assert.equal(request.buyer.identityNumber, "12345678901");
    });
});

describe("isPaidCheckout", () => {
    test("true only when status success AND paymentStatus SUCCESS", () => {
        assert.equal(isPaidCheckout({ status: "success", paymentStatus: "SUCCESS" }), true);
        assert.equal(isPaidCheckout({ status: "success", paymentStatus: "FAILURE" }), false);
        assert.equal(isPaidCheckout({ status: "failure", paymentStatus: "SUCCESS" }), false);
        assert.equal(isPaidCheckout({}), false);
    });
});

describe("rate limiter", () => {
    test("allows up to the limit then blocks within the window", async () => {
        const limiter = new InMemoryRateLimiter();
        const key = "test-key";

        for (let i = 0; i < 3; i += 1) {
            const result = await limiter.check(key, 3, 60);
            assert.equal(result.allowed, true);
        }

        const blocked = await limiter.check(key, 3, 60);
        assert.equal(blocked.allowed, false);
        assert.equal(typeof blocked.retryAfterSeconds, "number");
    });

    test("different keys are independent", async () => {
        const limiter = new InMemoryRateLimiter();
        await limiter.check("a", 1, 60);
        const result = await limiter.check("b", 1, 60);
        assert.equal(result.allowed, true);
    });
});

describe("monitoring: token hashing", () => {
    test("hashToken is deterministic, fixed-length, and never returns the raw token", () => {
        const token = "4bdc5d60-e343-4db0-b044-6d2bcc93c7bf";
        const hashed = hashToken(token);
        assert.equal(hashed.length, 16);
        assert.notEqual(hashed, token);
        assert.equal(hashed, hashToken(token));
    });
});

describe("MAX_PAYMENT_AMOUNT enforcement", () => {
    test("createPaymentLink rejects an over-ceiling amount before ever touching Firestore", async () => {
        await assert.rejects(
            () =>
                createPaymentLink({
                    paymentType: "deposit",
                    title: "Too large",
                    amount: MAX_PAYMENT_AMOUNT + 1,
                    currency: "TRY",
                }),
            /maximum allowed amount/,
        );
    });

    test("resolvePaymentRequest passes a real, in-catalog service through unaffected", async () => {
        const resolved = await resolvePaymentRequest({
            paymentType: "service",
            serviceSlug: "web-solutions",
            customer: {
                customerType: "tr_individual",
                firstName: "Test",
                lastName: "User",
                email: "test@example.com",
                phone: "+905551234567",
                address: "Test Sk. No:1",
                city: "Istanbul",
                country: "Turkey",
                zipCode: "34000",
                identityNumber: "12345678901",
            },
        });
        assert.equal(resolved.amount, 15000);
        assert.equal(resolved.amount <= MAX_PAYMENT_AMOUNT, true);
    });
});

describe("callback missing token (no I/O required)", () => {
    test("retrieveAndFinalizePayment returns failed/missing-token immediately", async () => {
        const { retrieveAndFinalizePayment } = await import("../engine");
        const result = await retrieveAndFinalizePayment("");
        assert.deepEqual(result, { outcome: "failed", reason: "missing-token" });
    });
});

describe("Sandbox label visibility logic", () => {
    // Mirrors the exact expression used in app/checkout/page.tsx and
    // app/payment-success/page.tsx to decide whether to render the
    // SANDBOX/TEST MODE badge.
    function isSandboxLabelVisible(baseUrl: string | undefined) {
        return Boolean(baseUrl?.includes("sandbox"));
    }

    test("sandbox base URL shows the label", () => {
        assert.equal(isSandboxLabelVisible("https://sandbox-api.iyzipay.com"), true);
    });

    test("production base URL hides the label", () => {
        assert.equal(isSandboxLabelVisible("https://api.iyzipay.com"), false);
    });

    test("unset base URL hides the label", () => {
        assert.equal(isSandboxLabelVisible(undefined), false);
    });
});
