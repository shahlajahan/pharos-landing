import Iyzipay from "iyzipay";
import { mapToIyzipayRequest } from "./iyzico-mapper";

const iyzipay = new Iyzipay({
    apiKey: process.env.IYZICO_API_KEY!,
    secretKey: process.env.IYZICO_SECRET_KEY!,
    uri: process.env.IYZICO_BASE_URL!,
});

export interface InitializeCheckoutInput {
    conversationId: string;

    price: number;

    title: string;

    buyer: {
        id: string;
        name: string;
        surname: string;
        email: string;
    };
}

export async function initializeCheckoutForm(
    input: InitializeCheckoutInput,
) {
    throw new Error("Not implemented.");
}

export async function retrieveCheckoutForm(token: string) {
    throw new Error("Not implemented.");
}

export default iyzipay;