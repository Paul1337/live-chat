import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

export interface UserDataScheme {
    email: string;
    username: string;
    id: string;
}

export interface UserProfileData {
    photo?: string;
    firstName: string;
    lastName: string;
}

export interface UserSliceScheme {
    isAuthed: boolean;
    userData: UserDataScheme | null;
    profileData: UserProfileData | null;
}

const initialState: UserSliceScheme = {
    isAuthed: false,
    userData: null,
    profileData: null,
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
        setProfileData(state: UserSliceScheme, action: PayloadAction<UserProfileData>) {
            state.profileData = action.payload;
        },
        setProfileImg(state: UserSliceScheme, action: PayloadAction<string>) {
            if (!state.profileData) return state;
            state.profileData.photo = action.payload;
        },
    },
});

export const { reducer: userReducer } = userSlice;
export const { actions: userActions } = userSlice;
