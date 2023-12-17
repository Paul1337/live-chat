import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MessageScheme } from '../model/message.model';

interface MessengerSliceScheme {
    messages: Array<MessageScheme>;
    isLoadingMessages: boolean;
}

const initialState: MessengerSliceScheme = {
    isLoadingMessages: false,
    messages: [
        {
            date: new Date().toString(),
            from: 0,
            id: 0,
            isMine: false,
            text: 'some text1',
        },
        {
            date: new Date().toString(),
            from: 0,
            id: 1,
            isMine: false,
            text: 'some more text',
        },
        {
            date: new Date().toString(),
            from: 0,
            id: 2,
            isMine: false,
            text: 'when text',
        },
    ],
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
    },
});

export const { reducer: messengerReducer } = messengerSlice;
export const { actions: messengerActions } = messengerSlice;
