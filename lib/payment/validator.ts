import { PaymentRequest } from "./types";

export function validatePaymentRequest(
    request: PaymentRequest,
): string | null {
    if (!request.title.trim()) {
        return "Title is required.";
    }

    if (request.amount <= 0) {
        return "Amount must be greater than zero.";
    }

    if (!request.customer.name.trim()) {
        return "Customer name is required.";
    }

    if (!request.customer.email.trim()) {
        return "Customer email is required.";
    }

    return null;
}