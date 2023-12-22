import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../../auth/slices/userSlice';
import { chatReducers } from '../../chat';

export const store = configureStore({
    reducer: combineReducers({
        ...chatReducers,
        user: userReducer,
    }),
});
