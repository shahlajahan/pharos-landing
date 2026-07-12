export interface ContactRequestInput {
    name: string;
    email: string;
    phone?: string;
    service: string;
    budget?: string;
    message: string;
}

export class ContactValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ContactValidationError";
    }
}
