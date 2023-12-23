export interface UserInfo {
    username: string;
    firstName: string;
    lastName: string;
}

export interface ChatResponse {
    users: Array<UserInfo>;
    groupName?: string;
    _id: string;
}

export interface ChatScheme {
    chatId: string;
    name: string;
}

export type ChatListType = Array<ChatScheme>;
