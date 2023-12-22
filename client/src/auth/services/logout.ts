import { axiosInstance } from '../../app/api/apiInstance';
import { ioClient } from '../../app/api/socketInstance';
import { AppThunk } from '../../app/model/store.model';
import { removeAuthToken, setAuthToken } from '../data/token';
import { UserDataScheme, userActions } from '../slices/userSlice';

interface LoginResponse {
    authToken: string;
    userData: UserDataScheme;
}

export const thunkLogout = (): AppThunk => {
    return async dispatch => {
        removeAuthToken();
        dispatch(userActions.setAuthed(false));
    };
};
