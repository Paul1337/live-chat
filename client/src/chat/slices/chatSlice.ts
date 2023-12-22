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
    },
});

export const { reducer: chatReducer } = chatSlice;
export const { actions: chatActions } = chatSlice;
