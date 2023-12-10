export interface MessageScheme {
    id: number;
    date: string;
    text: string;
    from: number;
    isMine: boolean;
}

export type MessageListType = Array<MessageScheme>;
