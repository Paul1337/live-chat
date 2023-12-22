import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export interface UserDataScheme {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    photo?: string;
    id: string;
}

export interface UserSliceScheme {
    isAuthed: boolean;
    userData: UserDataScheme | null;
}

const initialState: UserSliceScheme = {
    isAuthed: false,
    userData: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData(state: UserSliceScheme, action: PayloadAction<UserDataScheme | null>) {
            state.userData = action.payload;
        },
        setAuthed(state: UserSliceScheme, action: PayloadAction<boolean>) {
            state.isAuthed = action.payload;
        },
    },
});

export const { reducer: userReducer } = userSlice;
export const { actions: userActions } = userSlice;
