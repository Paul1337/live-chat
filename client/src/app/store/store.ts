import { ThunkAction, UnknownAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { chatCombinedReducer } from '../../chat';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { userReducer } from '../../auth/slices/userSlice';

export const store = configureStore({
    reducer: combineReducers({
        chat: chatCombinedReducer,
        user: userReducer,
    }),
});
