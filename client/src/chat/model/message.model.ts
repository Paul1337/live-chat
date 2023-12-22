export interface MessageDto {
    _id?: string;

    text?: string;
    img?: string;

    chatId: string;
    owner: string;

    createdAt?: string;
}

export interface MessageScheme {
    _id?: string;

    text?: string;
    img?: string;

    chatId: string;
    owner: string;

    createdAt?: string;
}

export type MessageListType = Array<MessageScheme>;
