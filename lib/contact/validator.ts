import { services } from "../../app/services";
import { ContactValidationError, type ContactRequestInput } from "./types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+()\s-]{7,20}$/;

const MAX_NAME_LENGTH = 200;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 20;
const MAX_SERVICE_LENGTH = 200;
const MAX_BUDGET_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 5000;

/** Same source of truth as the public catalog — rejects arbitrary values bypassing the dropdown. */
const VALID_SERVICE_NAMES = new Set(services.map((service) => service.titleEn));

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requireNonEmptyString(value: unknown, field: string, maxLength: number): string {
    if (typeof value !== "string" || !value.trim()) {
        throw new ContactValidationError(`${field} is required.`);
    }

    const trimmed = value.trim();

    if (trimmed.length > maxLength) {
        throw new ContactValidationError(`${field} is too long.`);
    }

    return trimmed;
}

function parseOptionalString(value: unknown, field: string, maxLength: number): string | undefined {
    if (value === undefined || value === null || value === "") {
        return undefined;
    }

    if (typeof value !== "string") {
        throw new ContactValidationError(`${field} is not valid.`);
    }

    const trimmed = value.trim();

    if (!trimmed) {
        return undefined;
    }

    if (trimmed.length > maxLength) {
        throw new ContactValidationError(`${field} is too long.`);
    }

    return trimmed;
}

/** Validates and normalizes raw request-body input. Never trusts the client — every field is re-checked here. */
export function parseContactRequestInput(raw: unknown): ContactRequestInput {
    if (!isRecord(raw)) {
        throw new ContactValidationError("Request body must be a JSON object.");
    }

    const name = requireNonEmptyString(raw.name, "Name", MAX_NAME_LENGTH);
    const email = requireNonEmptyString(raw.email, "Email", MAX_EMAIL_LENGTH);

    if (!EMAIL_PATTERN.test(email)) {
        throw new ContactValidationError("Email is not a valid email address.");
    }

    const service = requireNonEmptyString(raw.service, "Service", MAX_SERVICE_LENGTH);

    if (!VALID_SERVICE_NAMES.has(service)) {
        throw new ContactValidationError("Selected service is not valid.");
    }

    const message = requireNonEmptyString(raw.message, "Message", MAX_MESSAGE_LENGTH);

    const phone = parseOptionalString(raw.phone, "Phone", MAX_PHONE_LENGTH);

    if (phone && !PHONE_PATTERN.test(phone)) {
        throw new ContactValidationError("Phone number is not valid.");
    }

    const budget = parseOptionalString(raw.budget, "Budget", MAX_BUDGET_LENGTH);

    return { name, email, phone, service, budget, message };
}
