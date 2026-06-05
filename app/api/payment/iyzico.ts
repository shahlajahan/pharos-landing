import { createHmac, randomUUID, timingSafeEqual } from "crypto";
import { company, siteUrl } from "../../company";

type IyzicoResult = {
  status?: string;
  errorMessage?: string;
  token?: string;
  checkoutFormContent?: string;
  paymentPageUrl?: string;
  checkoutPageUrl?: string;
  paymentStatus?: string;
  paymentId?: string;
  conversationId?: string;
  price?: string;
  paidPrice?: string;
  currency?: string;
};

type IyzicoConfig = {
  uri: string;
  apiKey: string;
  secretKey: string;
};

type IyzicoClient = {
  checkoutFormInitialize: {
    create: (
      request: Record<string, unknown>,
      callback: (error: unknown, result: IyzicoResult) => void
    ) => void;
  };
  checkoutForm: {
    retrieve: (
      request: Record<string, unknown>,
      callback: (error: unknown, result: IyzicoResult) => void
    ) => void;
  };
};

type CheckoutFormInitializeResource = IyzicoClient["checkoutFormInitialize"];
type CheckoutFormResource = IyzicoClient["checkoutForm"];
type IyzicoResourceConstructor<TResource> = new (
  config: IyzicoConfig
) => TResource;

// The iyzipay package is CommonJS and does not ship TypeScript definitions.
// Import only the resources this app uses. The top-level iyzipay constructor
// scans lib/resources at runtime, which is brittle in Vercel serverless bundles.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CheckoutFormInitialize = require("iyzipay/lib/resources/CheckoutFormInitialize") as IyzicoResourceConstructor<
  CheckoutFormInitializeResource
>;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CheckoutForm = require("iyzipay/lib/resources/CheckoutForm") as IyzicoResourceConstructor<
  CheckoutFormResource
>;

export class IyzicoConfigError extends Error {
  constructor() {
    super("Iyzico credentials are not configured");
    this.name = "IyzicoConfigError";
  }
}

export type PaymentBuyer = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  billingAddress: string;
  ip: string;
};

export type PaymentService = {
  id: string;
  name: string;
  price: number;
};

const locale = "tr";
const currency = "TRY";
const paymentGroup = "PRODUCT";
const basketItemType = "VIRTUAL";

function getRequiredIyzicoConfig() {
  const uri = process.env.IYZICO_BASE_URL?.trim();
  const apiKey = process.env.IYZICO_API_KEY?.trim();
  const secretKey = process.env.IYZICO_SECRET_KEY?.trim();

  if (!uri || !apiKey || !secretKey) {
    throw new IyzicoConfigError();
  }

  return {
    uri,
    apiKey,
    secretKey,
  };
}

function getIyzicoClient(): IyzicoClient {
  const config = getRequiredIyzicoConfig();

  return {
    checkoutFormInitialize: new CheckoutFormInitialize(config),
    checkoutForm: new CheckoutForm(config),
  };
}

export function getPublicBaseUrl(request: Request) {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? siteUrl;
  const fallbackUrl = new URL(request.url).origin;
  return (configuredUrl || fallbackUrl).replace(/\/$/, "");
}

export function getPaymentCallbackUrl(baseUrl: string) {
  return `${baseUrl.replace(/\/$/, "")}/api/payment/callback`;
}

export function createPaymentVerificationSignature(token: string) {
  const { secretKey } = getRequiredIyzicoConfig();

  return createHmac("sha256", secretKey).update(token).digest("hex");
}

export function isPaymentVerificationSignatureValid(
  token: string,
  signature: string
) {
  const expectedSignature = createPaymentVerificationSignature(token);
  const expectedBuffer = Buffer.from(expectedSignature, "hex");
  const receivedBuffer = Buffer.from(signature, "hex");

  if (expectedBuffer.length !== receivedBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, receivedBuffer);
}

export function formatIyzicoPrice(price: number) {
  return price.toFixed(2);
}

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const name = parts.shift() ?? "Pharos";
  const surname = parts.length > 0 ? parts.join(" ") : "Customer";
  return { name, surname };
}

function normalizePhone(phone: string) {
  const trimmed = phone.trim();
  return trimmed || "+905350000000";
}

function normalizeAddress(address: string) {
  return address.trim() || company.address;
}

function extractCity(address: string) {
  const normalized = normalizeAddress(address);
  if (/istanbul/i.test(normalized)) {
    return "Istanbul";
  }

  return "Istanbul";
}

function iyzicoRequest<T>(
  executor: (callback: (error: unknown, result: T) => void) => void
) {
  return new Promise<T>((resolve, reject) => {
    executor((error, result) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(result);
    });
  });
}

export async function createCheckoutForm({
  buyer,
  service,
  request,
}: {
  buyer: PaymentBuyer;
  service: PaymentService;
  request: Request;
}) {
  const iyzipay = getIyzicoClient();
  const baseUrl = getPublicBaseUrl(request);
  const price = formatIyzicoPrice(service.price);
  const conversationId = randomUUID();
  const { name, surname } = splitName(buyer.name);
  const billingAddress = normalizeAddress(buyer.billingAddress);
  const contactName = buyer.company?.trim() || buyer.name.trim() || company.name;

  const checkoutRequest = {
    locale,
    conversationId,
    price,
    paidPrice: price,
    currency,
    basketId: `PHAROS-${service.id}-${conversationId}`,
    paymentGroup,
    callbackUrl: getPaymentCallbackUrl(baseUrl),
    enabledInstallments: [1, 2, 3, 6, 9],
    buyer: {
      id: `buyer-${conversationId}`,
      name,
      surname,
      gsmNumber: normalizePhone(buyer.phone),
      email: buyer.email,
      identityNumber: "11111111111",
      registrationAddress: billingAddress,
      ip: buyer.ip,
      city: extractCity(billingAddress),
      country: "Turkey",
      zipCode: "34000",
    },
    shippingAddress: {
      contactName,
      city: extractCity(billingAddress),
      country: "Turkey",
      address: billingAddress,
      zipCode: "34000",
    },
    billingAddress: {
      contactName,
      city: extractCity(billingAddress),
      country: "Turkey",
      address: billingAddress,
      zipCode: "34000",
    },
    basketItems: [
      {
        id: service.id,
        name: service.name,
        category1: "Software Services",
        category2: "Pharos Teknoloji",
        itemType: basketItemType,
        price,
      },
    ],
  };

  return iyzicoRequest<IyzicoResult>((callback) => {
    iyzipay.checkoutFormInitialize.create(checkoutRequest, callback);
  });
}

export async function verifyCheckoutForm(token: string) {
  const iyzipay = getIyzicoClient();

  return iyzicoRequest<IyzicoResult>((callback) => {
    iyzipay.checkoutForm.retrieve(
      {
        locale,
        conversationId: randomUUID(),
        token,
      },
      callback
    );
  });
}

export function isPaidCheckout(result: IyzicoResult) {
  return result.status === "success" && result.paymentStatus === "SUCCESS";
}
