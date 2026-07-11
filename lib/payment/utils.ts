import { CONVERSATION_PREFIX } from "./constants";

export function generateConversationId() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).slice(2, 8).toUpperCase();

    return `${CONVERSATION_PREFIX}-${timestamp}-${random}`;
}