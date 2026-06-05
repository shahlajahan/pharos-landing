import { NextResponse } from "next/server";
import {
  IyzicoConfigError,
  createPaymentVerificationSignature,
  isPaidCheckout,
  verifyCheckoutForm,
} from "../iyzico";

export const runtime = "nodejs";

type CallbackPayload = Record<string, string>;

function toPayloadValue(value: unknown) {
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

async function readCallbackPayload(request: Request) {
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
    console.log("PAYMENT FAILED", {
      reason: "callback-payload-read-failed",
      error: error instanceof Error ? error.message : "Unknown payload error",
    });
  }

  return payload;
}

function getToken(payload: CallbackPayload) {
  return (
    payload.token?.trim() ||
    payload.paymentToken?.trim() ||
    payload.checkoutFormToken?.trim() ||
    ""
  );
}

function redirectUser(request: Request, pathname: string, params?: CallbackPayload) {
  const destination = new URL(pathname, request.url);

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value) {
      destination.searchParams.set(key, value);
    }
  });

  console.log("REDIRECTING USER", {
    destination: `${destination.pathname}${destination.search}`,
  });

  return NextResponse.redirect(destination, { status: 303 });
}

async function handlePaymentCallback(request: Request) {
  const payload = await readCallbackPayload(request);
  const token = getToken(payload);

  console.log("PAYMENT CALLBACK RECEIVED", {
    method: request.method,
    hasToken: Boolean(token),
    payloadKeys: Object.keys(payload),
  });

  if (!token) {
    console.log("PAYMENT FAILED", {
      reason: "missing-token",
    });

    return redirectUser(request, "/payment-failed", {
      reason: "missing-token",
    });
  }

  try {
    const result = await verifyCheckoutForm(token);

    if (isPaidCheckout(result)) {
      const verification = createPaymentVerificationSignature(token);

      console.log("PAYMENT VERIFIED", {
        paymentId: result.paymentId,
        conversationId: result.conversationId,
        status: result.status,
        paymentStatus: result.paymentStatus,
      });

      return redirectUser(request, "/payment-success", { token, verification });
    }

    console.log("PAYMENT FAILED", {
      reason: "verification-failed",
      status: result.status,
      paymentStatus: result.paymentStatus,
      error: result.errorMessage,
    });

    return redirectUser(request, "/payment-failed", {
      reason: "verification-failed",
    });
  } catch (error) {
    const reason =
      error instanceof IyzicoConfigError
        ? "iyzico-config-missing"
        : "verification-error";

    console.log("PAYMENT FAILED", {
      reason,
      error: error instanceof Error ? error.message : "Payment verification failed",
    });

    return redirectUser(request, "/payment-failed", { reason });
  }
}

export async function GET(request: Request) {
  return handlePaymentCallback(request);
}

export async function POST(request: Request) {
  return handlePaymentCallback(request);
}
