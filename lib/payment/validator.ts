import { PAYMENT_TYPES } from "./constants";
import type { CustomerInfo, CustomerType, InitializePaymentInput, PaymentType } from "./types";
import { PaymentValidationError } from "./types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+()\s-]{7,20}$/;
const MAX_TEXT_LENGTH = 200;
const MAX_METADATA_ENTRIES = 20;

const CUSTOMER_TYPES: readonly CustomerType[] = ["tr_individual", "foreign_individual", "company"];

/** Turkish TC Kimlik No: exactly 11 digits. */
const TR_IDENTITY_PATTERN = /^\d{11}$/;
/** Turkish vergi numarası (tax ID): 10 digits (standard corporate format). */
const COMPANY_TAX_ID_PATTERN = /^\d{10}$/;
/** Foreign passport/national ID: alphanumeric, no fixed national format. */
const FOREIGN_IDENTITY_PATTERN = /^[A-Za-z0-9]{5,20}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requireNonEmptyString(
    value: unknown,
    field: string,
    { maxLength = MAX_TEXT_LENGTH }: { maxLength?: number } = {},
): string {
    if (typeof value !== "string" || !value.trim()) {
        throw new PaymentValidationError(`${field} is required.`);
    }

    const trimmed = value.trim();

    if (trimmed.length > maxLength) {
        throw new PaymentValidationError(`${field} is too long.`);
    }

    return trimmed;
}

function parseCustomerType(value: unknown): CustomerType {
    if (typeof value !== "string" || !CUSTOMER_TYPES.includes(value as CustomerType)) {
        throw new PaymentValidationError("Customer type is required (Turkish individual, foreign individual, or company).");
    }

    return value as CustomerType;
}

/**
 * Validates identityNumber against the format the selected customerType
 * actually requires. Every branch is required — none of these are optional,
 * matching iyzico's own requirement that every buyer supply a non-empty
 * identityNumber.
 */
function validateIdentityNumber(customerType: CustomerType, rawValue: unknown): string {
    const label =
        customerType === "tr_individual"
            ? "TC Kimlik No"
            : customerType === "company"
              ? "Vergi numarası"
              : "Passport / national ID number";

    const value = requireNonEmptyString(rawValue, label, { maxLength: 20 });

    if (customerType === "tr_individual" && !TR_IDENTITY_PATTERN.test(value)) {
        throw new PaymentValidationError("TC Kimlik No must be exactly 11 digits.");
    }

    if (customerType === "company" && !COMPANY_TAX_ID_PATTERN.test(value)) {
        throw new PaymentValidationError("Vergi numarası must be exactly 10 digits.");
    }

    if (customerType === "foreign_individual" && !FOREIGN_IDENTITY_PATTERN.test(value)) {
        throw new PaymentValidationError("Passport / national ID number is not valid.");
    }

    return value;
}

function parseCustomer(value: unknown): CustomerInfo {
    if (!isRecord(value)) {
        throw new PaymentValidationError("Customer information is required.");
    }

    const customerType = parseCustomerType(value.customerType);
    const firstName = requireNonEmptyString(value.firstName, "Customer first name");
    const lastName = requireNonEmptyString(value.lastName, "Customer last name");
    const email = requireNonEmptyString(value.email, "Customer email", { maxLength: 254 });

    if (!EMAIL_PATTERN.test(email)) {
        throw new PaymentValidationError("Customer email is not a valid email address.");
    }

    const phone = requireNonEmptyString(value.phone, "Customer phone");

    if (!PHONE_PATTERN.test(phone)) {
        throw new PaymentValidationError("Customer phone number is not valid.");
    }

    const address = requireNonEmptyString(value.address, "Customer address", { maxLength: 500 });
    const city = requireNonEmptyString(value.city, "Customer city");
    const country = requireNonEmptyString(value.country, "Customer country");
    const zipCode = requireNonEmptyString(value.zipCode, "Customer zip code", { maxLength: 20 });
    const identityNumber = validateIdentityNumber(customerType, value.identityNumber);

    return { customerType, firstName, lastName, email, phone, address, city, country, zipCode, identityNumber };
}

function parseMetadata(value: unknown): Record<string, string> | undefined {
    if (value === undefined) {
        return undefined;
    }

    if (!isRecord(value)) {
        throw new PaymentValidationError("Metadata must be an object of string values.");
    }

    const entries = Object.entries(value);

    if (entries.length > MAX_METADATA_ENTRIES) {
        throw new PaymentValidationError("Too many metadata entries.");
    }

    const metadata: Record<string, string> = {};

    for (const [key, entryValue] of entries) {
        if (typeof entryValue !== "string" || entryValue.length > MAX_TEXT_LENGTH) {
            throw new PaymentValidationError(`Metadata value for "${key}" is not valid.`);
        }

        metadata[key] = entryValue;
    }

    return metadata;
}

export function parseInitializeInput(raw: unknown): InitializePaymentInput {
    if (!isRecord(raw)) {
        throw new PaymentValidationError("Request body must be a JSON object.");
    }

    const paymentType = raw.paymentType;

    if (typeof paymentType !== "string" || !PAYMENT_TYPES.includes(paymentType as PaymentType)) {
        throw new PaymentValidationError("Unsupported payment type.");
    }

    const customer = parseCustomer(raw.customer);
    const metadata = parseMetadata(raw.metadata);

    if (paymentType === "service") {
        const serviceSlug = requireNonEmptyString(raw.serviceSlug, "serviceSlug");
        return { paymentType, serviceSlug, customer, metadata };
    }

    const referenceId = requireNonEmptyString(raw.referenceId, "referenceId", { maxLength: 64 });
    return { paymentType: paymentType as PaymentType, referenceId, customer, metadata };
}
