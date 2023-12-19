import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatListType, ChatScheme } from '../model/chat.model';

interface ChatSliceScheme {
    chatList: ChatListType;
    searchText: string;
}

const initialState: ChatSliceScheme = {
    chatList: [],
    searchText: '',
};

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
    },
});

export const { reducer: chatReducer } = chatSlice;
export const { actions: chatActions } = chatSlice;
