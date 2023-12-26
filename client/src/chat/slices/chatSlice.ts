import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatListType, ChatScheme } from '../model/chat.model';

interface ChatSliceScheme {
    chatList: ChatListType;
    searchText: string;
    isLoadingChats: boolean;
}

const initialState: ChatSliceScheme = {
    chatList: [],
    isLoadingChats: false,
    searchText: '',
};

interface SetActivityPayload {
    chatId: string;
    lastActivity: string;
}

interface IncrementChatUnreadPayload {
    chatId: string;
    amount: number;
}

export const chatSlice = createSlice({
    initialState,
    name: 'chat',
    reducers: {
        setSearchText(state: ChatSliceScheme, action: PayloadAction<string>) {
            state.searchText = action.payload;
        },
        setChats(state: ChatSliceScheme, action: PayloadAction<ChatListType>) {
            state.chatList = action.payload;
        },
        addChat(state: ChatSliceScheme, action: PayloadAction<ChatScheme>) {
            state.chatList.push(action.payload);
        },
        setIsLoadingChats(state: ChatSliceScheme, action: PayloadAction<boolean>) {
            state.isLoadingChats = action.payload;
        },
        readChat(state: ChatSliceScheme, action: PayloadAction<string>) {
            const chat = state.chatList.find(chat => chat.chatId === action.payload);
            if (!chat) return state;
            chat.unreadCount = 0;
        },
        updateChatActivity(state: ChatSliceScheme, action: PayloadAction<SetActivityPayload>) {
            const chat = state.chatList.find(chat => chat.chatId === action.payload.chatId);
            if (!chat) return state;
            chat.lastActivity = action.payload.lastActivity;
        },
        incrementChatUnread(state: ChatSliceScheme, action: PayloadAction<IncrementChatUnreadPayload>) {
            const chat = state.chatList.find(chat => chat.chatId === action.payload.chatId);
            if (!chat) return state;
            chat.unreadCount += action.payload.amount;
        },
    },
});

export const { reducer: chatReducer } = chatSlice;
export const { actions: chatActions } = chatSlice;
