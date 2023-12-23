export interface SendMessageRequest {
    text?: string;
    img?: string;

    chatId: string;
    owner: string;
}

export interface MessageResponse {
    _id?: string;

    text?: string;
    img?: string;

    chatId: string;
    owner: string;

    ownerData: {
        firstName: string;
        lastName: string;
    };

    createdAt?: string;
}

export interface MessageScheme {
    _id?: string;

    text?: string;
    img?: string;

    chatId: string;
    owner: string;

    ownerData: {
        firstName: string;
        lastName: string;
    };

    createdAt?: string;
}

export type MessageListType = Array<MessageScheme>;
