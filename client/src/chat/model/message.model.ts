export interface MessageDto {
    text: string;
    _id: string;
}

export interface MessageScheme {
    id: string;
    // date: string;
    text: string;
    // from: number;
    // isMine: boolean;
}

export type MessageListType = Array<MessageScheme>;
