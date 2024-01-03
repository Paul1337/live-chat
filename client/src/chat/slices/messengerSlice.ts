import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MessageScheme } from '../model/message.model';

interface MessengerSliceScheme {
    messages: Array<MessageScheme>;
    isLoadingMessages: boolean;
}

const initialState: MessengerSliceScheme = {
    isLoadingMessages: false,
    messages: [],
};

export const messengerSlice = createSlice({
    name: 'messenger',
    initialState,
    reducers: {
        setIsLoadingMessages(state: MessengerSliceScheme, action: PayloadAction<boolean>) {
            state.isLoadingMessages = action.payload;
        },
        setMessages(state: MessengerSliceScheme, action: PayloadAction<Array<MessageScheme>>) {
            state.messages = action.payload;
        },
        addMessage(state: MessengerSliceScheme, action: PayloadAction<MessageScheme>) {
            state.messages.push(action.payload);
        },
        readAll(state: MessengerSliceScheme, action: PayloadAction<void>) {
            state.messages.forEach(mes => (mes.isRead = true));
        },
        removeMessage(state: MessengerSliceScheme, action: PayloadAction<string>) {
            state.messages = state.messages.filter(msg => msg._id !== action.payload);
        },
    },
});

export const { reducer: messengerReducer } = messengerSlice;
export const { actions: messengerActions } = messengerSlice;
