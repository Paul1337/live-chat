import { chatReducer } from './slices/chatSlice';
import { messengerReducer } from './slices/messengerSlice';

export { Chat } from './ui';

export const chatReducers = {
    chat: chatReducer,
    messenger: messengerReducer,
};
