import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { chatCombinedReducer } from '../../chat';

export const store = configureStore({
    reducer: combineReducers({
        chat: chatCombinedReducer,
    }),
});
