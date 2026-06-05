import { createHmac, randomUUID } from "crypto";
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
  price?: string | number;
  paidPrice?: string | number;
  currency?: string;
  [key: string]: unknown;
};

type IyzicoConfig = {
  uri: string;
  apiKey: string;
  secretKey: string;
};

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

type CheckoutInitializeRequest = {
  locale: string;
  conversationId: string;
  price: string;
  paidPrice: string;
  currency: string;
  basketId: string;
  paymentGroup: string;
  callbackUrl: string;
  enabledInstallments: number[];
  buyer: {
    id: string;
    name: string;
    surname: string;
    gsmNumber: string;
    email: string;
    identityNumber: string;
    registrationAddress: string;
    ip: string;
    city: string;
    country: string;
    zipCode: string;
  };
  shippingAddress: {
    contactName: string;
    city: string;
    country: string;
    address: string;
    zipCode: string;
  };
  billingAddress: {
    contactName: string;
    city: string;
    country: string;
    address: string;
    zipCode: string;
  };
  basketItems: {
    id: string;
    name: string;
    category1: string;
    category2: string;
    itemType: string;
    price: string;
  }[];
};

const locale = "tr";
const currency = "TRY";
const paymentGroup = "PRODUCT";
const basketItemType = "VIRTUAL";

const checkoutFormInitializePath =
  "/payment/iyzipos/checkoutform/initialize/auth/ecom";
const checkoutFormRetrievePath = "/payment/iyzipos/checkoutform/auth/ecom/detail";

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

export function getPublicBaseUrl(request: Request) {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? siteUrl;
  const fallbackUrl = new URL(request.url).origin;
  return (configuredUrl || fallbackUrl).replace(/\/$/, "");
}

export function getPaymentCallbackUrl(baseUrl: string) {
  return `${baseUrl.replace(/\/$/, "")}/api/payment/callback`;
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

function normalizeIyzicoBaseUrl(uri: string) {
  return uri.replace(/\/$/, "");
}

function createRandomKey() {
  return `${Date.now()}${randomUUID().replace(/-/g, "")}`;
}

function createAuthorizationHeader({
  apiKey,
  body,
  path,
  randomKey,
  secretKey,
}: {
  apiKey: string;
  body: string;
  path: string;
  randomKey: string;
  secretKey: string;
}) {
  const signature = createHmac("sha256", secretKey)
    .update(`${randomKey}${path}${body}`)
    .digest("hex");
  const authorizationString = `apiKey:${apiKey}&randomKey:${randomKey}&signature:${signature}`;
  const encodedAuthorization = Buffer.from(authorizationString, "utf8").toString(
    "base64"
  );

  return `IYZWSv2 ${encodedAuthorization}`;
}

async function postIyzico(path: string, payload: object, config: IyzicoConfig) {
  const body = JSON.stringify(payload);
  const randomKey = createRandomKey();
  const response = await fetch(`${normalizeIyzicoBaseUrl(config.uri)}${path}`, {
    method: "POST",
    headers: {
      Authorization: createAuthorizationHeader({
        apiKey: config.apiKey,
        body,
        path,
        randomKey,
        secretKey: config.secretKey,
      }),
      "Content-Type": "application/json",
      "x-iyzi-rnd": randomKey,
    },
    body,
  });

  const responseText = await response.text();
  const result = responseText
    ? (JSON.parse(responseText) as IyzicoResult)
    : ({ status: response.ok ? "success" : "failure" } as IyzicoResult);

  if (!response.ok && !result.errorMessage) {
    result.status = result.status ?? "failure";
    result.errorMessage = `iyzico API request failed with HTTP ${response.status}`;
  }

  return result;
}

function logCheckoutInitializeFailure({
  checkoutRequest,
  config,
  error,
  result,
}: {
  checkoutRequest: CheckoutInitializeRequest;
  config: IyzicoConfig;
  error?: unknown;
  result?: IyzicoResult;
}) {
  const failureLog = {
    apiCall: `POST ${checkoutFormInitializePath}`,
    config: {
      uri: config.uri,
      apiKeyLoaded: Boolean(config.apiKey),
      secretKeyLoaded: Boolean(config.secretKey),
      apiKeyLength: config.apiKey.length,
      secretKeyLength: config.secretKey.length,
      apiKeyStartsSandbox: config.apiKey.startsWith("sandbox-"),
      secretKeyStartsSandbox: config.secretKey.startsWith("sandbox-"),
    },
    payloadTypes: {
      price: typeof checkoutRequest.price,
      paidPrice: typeof checkoutRequest.paidPrice,
      basketItemPrices: checkoutRequest.basketItems.map((basketItem) => ({
        id: basketItem.id,
        price: typeof basketItem.price,
      })),
    },
    checkoutRequest,
    iyzicoResult: result
      ? {
          status: result.status,
          errorMessage: result.errorMessage,
          conversationId: result.conversationId,
          tokenReceived: Boolean(result.token),
        }
      : undefined,
    apiError:
      error instanceof Error ? error.message : error ? String(error) : undefined,
  };

  console.error(
    "IYZICO CHECKOUT INITIALIZE FAILURE",
    JSON.stringify(failureLog, null, 2)
  );
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
  const config = getRequiredIyzicoConfig();
  const baseUrl = getPublicBaseUrl(request);
  const price = formatIyzicoPrice(service.price);
  const conversationId = randomUUID();
  const { name, surname } = splitName(buyer.name);
  const billingAddress = normalizeAddress(buyer.billingAddress);
  const contactName = buyer.company?.trim() || buyer.name.trim() || company.name;

  const checkoutRequest: CheckoutInitializeRequest = {
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
      email: buyer.email.trim(),
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

  try {
    const result = await postIyzico(
      checkoutFormInitializePath,
      checkoutRequest,
      config
    );

    if (result.status !== "success") {
      logCheckoutInitializeFailure({ checkoutRequest, config, result });
    }

    return result;
  } catch (error) {
    logCheckoutInitializeFailure({ checkoutRequest, config, error });
    throw error;
  }
}

export async function verifyCheckoutForm(token: string) {
  const config = getRequiredIyzicoConfig();

  return postIyzico(
    checkoutFormRetrievePath,
    {
      locale,
      conversationId: randomUUID(),
      token,
    },
    config
  );
}

export function isPaidCheckout(result: IyzicoResult) {
  return result.status === "success" && result.paymentStatus === "SUCCESS";
}
