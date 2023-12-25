export interface UserInfo {
    username: string;
    firstName: string;
    lastName: string;
    profileImg?: string;
}

export interface ChatResponse {
    users: Array<UserInfo>;
    groupName?: string;
    unreadCount: number;
    _id: string;
    lastActivity: string;
}

export interface ChatScheme {
    chatId: string;
    name: string;
    unreadCount: number;
    photo?: string;
    lastActivity?: string;
}

export type ChatListType = Array<ChatScheme>;
