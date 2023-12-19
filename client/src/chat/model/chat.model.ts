export interface UserInfo {
    username: string;
    firstName: string;
    lastName: string;
}

export interface ChatDto {
    users: Array<UserInfo>;
    _id: string;
}

export interface ChatScheme {
    chatId: string;
    name: string;
}

export type ChatListType = Array<ChatScheme>;
