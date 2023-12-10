import { combineReducers } from '@reduxjs/toolkit';
import { chatReducer } from './slices/chatSlice';
import { messengerReducer } from './slices/messengerSlice';

export { Chat } from './ui';

export const chatCombinedReducer = combineReducers({
    chat: chatReducer,
    messenger: messengerReducer,
});
