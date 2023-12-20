export interface UserInfo {
    username: string;
    firstName: string;
    lastName: string;
}

export interface ChatDto {
    users: Array<UserInfo>;
    groupName?: string;
    _id: string;
}

export interface ChatScheme {
    chatId: string;
    name: string;
}

export type ChatListType = Array<ChatScheme>;
