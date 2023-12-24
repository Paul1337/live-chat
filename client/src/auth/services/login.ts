import { axiosInstance } from '../../app/api/apiInstance';
import { ioClient } from '../../app/api/socketInstance';
import { AppThunk } from '../../app/model/store.model';
import { setAuthToken } from '../data/token';
import { LoginResponse } from '../model/user.model';
import { UserDataScheme, userActions } from '../slices/userSlice';
import { mapUserResponseDataToData } from './converters/user';

interface ThunkLogInData {
    username: string;
    password: string;
}

export const thunkLogIn = (data: ThunkLogInData): AppThunk<Promise<any>> => {
    return async dispatch => {
        const response = await axiosInstance.post<LoginResponse>('/auth/log_in', data);
        const { authToken, userData } = response.data;
        setAuthToken(authToken);
        ioClient.auth = {
            token: authToken,
        };
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
        dispatch(userActions.setAuthed(true));
        dispatch(userActions.setUserData(mapUserResponseDataToData(userData)));
        return Promise.resolve();
    };
};
