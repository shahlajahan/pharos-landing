import { NextResponse } from "next/server";
import { getServiceBySlug } from "../../../services";
import { IyzicoConfigError, createCheckoutForm } from "../iyzico";

export const runtime = "nodejs";

type CreatePaymentPayload = {
  service?: {
    id?: string;
    name?: string;
    price?: number;
  };
  buyer?: {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    billingAddress?: string;
  };
};

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "127.0.0.1";
  }

  return request.headers.get("x-real-ip") ?? "127.0.0.1";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as CreatePaymentPayload;
    const postedService = payload.service;
    const buyer = payload.buyer;

    if (!postedService?.id || !postedService.name || !postedService.price) {
      return NextResponse.json(
        { error: "Selected service is required." },
        { status: 400 }
      );
    }

    const catalogService = getServiceBySlug(postedService.id);

    if (!catalogService) {
      return NextResponse.json(
        { error: "Selected service was not found." },
        { status: 400 }
      );
    }

    if (
      postedService.name !== catalogService.titleEn ||
      postedService.price !== catalogService.price
    ) {
      return NextResponse.json(
        { error: "Selected service data does not match the catalog." },
        { status: 400 }
      );
    }

    if (!buyer?.name?.trim() || !buyer.email?.trim()) {
      return NextResponse.json(
        { error: "Buyer name and email are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(buyer.email)) {
      return NextResponse.json(
        { error: "A valid buyer email is required." },
        { status: 400 }
      );
    }

    const result = await createCheckoutForm({
      request,
      service: {
        id: catalogService.slug,
        name: catalogService.titleEn,
        price: catalogService.price,
      },
      buyer: {
        name: buyer.name,
        email: buyer.email,
        phone: buyer.phone ?? "",
        company: buyer.company,
        billingAddress: buyer.billingAddress ?? "",
        ip: getClientIp(request),
      },
    });

    if (result.status !== "success") {
      return NextResponse.json(
        {
          error: result.errorMessage ?? "iyzico checkout could not be created.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      token: result.token,
      checkoutFormContent: result.checkoutFormContent,
      checkoutPageUrl: result.paymentPageUrl ?? result.checkoutPageUrl,
      paymentPageUrl: result.paymentPageUrl,
    });
  } catch (error) {
    if (error instanceof IyzicoConfigError) {
      return NextResponse.json(
        { error: "Iyzico credentials are not configured" },
        { status: 500 }
      );
    }

    const message =
      error instanceof Error
        ? error.message
        : "Payment initialization failed.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
