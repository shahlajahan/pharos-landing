import { NextResponse } from "next/server";
import { IyzicoConfigError, isPaidCheckout, verifyCheckoutForm } from "../iyzico";

export const runtime = "nodejs";

type VerifyPaymentPayload = {
  token?: string;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as VerifyPaymentPayload;
    const token = payload.token?.trim();

    if (!token) {
      return NextResponse.json(
        { verified: false, error: "Payment token is required." },
        { status: 400 }
      );
    }

    const result = await verifyCheckoutForm(token);
    const verified = isPaidCheckout(result);

    return NextResponse.json({
      verified,
      status: result.status,
      paymentStatus: result.paymentStatus,
      paymentId: result.paymentId,
      conversationId: result.conversationId,
      price: result.price,
      paidPrice: result.paidPrice,
      currency: result.currency,
      error: verified ? undefined : result.errorMessage ?? "Payment is not successful.",
    });
  } catch (error) {
    if (error instanceof IyzicoConfigError) {
      return NextResponse.json(
        {
          verified: false,
          error: "Iyzico credentials are not configured",
        },
        { status: 500 }
      );
    }

    const message =
      error instanceof Error ? error.message : "Payment verification failed.";

    return NextResponse.json(
      { verified: false, error: message },
      { status: 500 }
    );
  }
}
