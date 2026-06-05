import { randomUUID } from "crypto";
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
      request: object,
      callback: (error: unknown, result: IyzicoResult) => void
    ) => void;
  };
  checkoutForm: {
    retrieve: (
      request: object,
      callback: (error: unknown, result: IyzicoResult) => void
    ) => void;
  };
};

type IyzicoConstructor = {
  new (config: IyzicoConfig): IyzicoClient;
  LOCALE: {
    TR: string;
  };
  CURRENCY: {
    TRY: string;
  };
  PAYMENT_GROUP: {
    PRODUCT: string;
  };
  BASKET_ITEM_TYPE: {
    VIRTUAL: string;
  };
};

// The iyzipay package is CommonJS and does not ship TypeScript definitions.
// Use the official top-level SDK constructor so request signing, URI
// normalization, and resource initialization stay inside the SDK.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Iyzipay = require("iyzipay") as IyzicoConstructor;

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

const locale = Iyzipay.LOCALE.TR;
const currency = Iyzipay.CURRENCY.TRY;
const paymentGroup = Iyzipay.PAYMENT_GROUP.PRODUCT;
const basketItemType = Iyzipay.BASKET_ITEM_TYPE.VIRTUAL;

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

function getIyzicoClient(config = getRequiredIyzicoConfig()): IyzicoClient {
  const { apiKey, secretKey, uri } = config;

  return new Iyzipay({
    apiKey,
    secretKey,
    uri,
  });
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
    sdkConstructor: "new Iyzipay({ apiKey, secretKey, uri })",
    sdkCall: "iyzipay.checkoutFormInitialize.create(checkoutRequest, callback)",
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
    sdkError:
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
  const iyzipay = getIyzicoClient(config);
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
    const result = await iyzicoRequest<IyzicoResult>((callback) => {
      iyzipay.checkoutFormInitialize.create(checkoutRequest, callback);
    });

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
