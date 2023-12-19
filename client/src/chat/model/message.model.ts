// export interface MessageDto {
//     img?: string;
//     text?: string;
//     owner: string;
//     to: string;
//     _id: string;
//     createdAt: string;
//     chatId: string;
// }

export interface MessageScheme {
    _id?: string;

    text?: string;
    img?: string;

    chatId: string;
    owner: string;

    createdAt?: string;
}

export type MessageListType = Array<MessageScheme>;
