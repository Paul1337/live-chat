import { axiosInstance } from '../../app/api/apiInstance';
import { AppThunk } from '../../app/model/store.model';
import { setAuthToken } from '../data/token';
import { UserDataScheme, userActions } from '../slices/userSlice';

export const thunkAuth = (): AppThunk => {
    return async dispatch => {
        try {
            const { data } = await axiosInstance.post<UserDataScheme>('/auth/me');
            dispatch(userActions.setUserData(data));
            dispatch(userActions.setAuthed(true));
        } catch (err) {
            dispatch(userActions.setAuthed(false));
        }
    };
};
