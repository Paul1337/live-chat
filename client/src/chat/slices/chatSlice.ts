import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatListType, ChatScheme } from '../model/chat.model';

interface ChatSliceScheme {
    chatList: ChatListType;
    currentChat: ChatScheme | null;
    searchText: string;
}

const initialState: ChatSliceScheme = {
    chatList: [
        {
            chatId: 0,
            name: 'br',
        },
        {
            chatId: 1,
            name: 'friend',
        },
        {
            chatId: 2,
            name: 'someone',
        },
    ],
    currentChat: null,
    searchText: '',
};

export const chatSlice = createSlice({
    initialState,
    name: 'chat',
    reducers: {
        setSearchText(state: ChatSliceScheme, action: PayloadAction<string>) {
            state.searchText = action.payload;
        },
        setCurrentChat(state: ChatSliceScheme, action: PayloadAction<ChatScheme>) {
            state.currentChat = action.payload;
        },
    },
});

export const { reducer: chatReducer } = chatSlice;
export const { actions: chatActions } = chatSlice;
