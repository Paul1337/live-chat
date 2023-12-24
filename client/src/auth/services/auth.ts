import { axiosInstance } from '../../app/api/apiInstance';
import { AppThunk } from '../../app/model/store.model';
import { setAuthToken } from '../data/token';
import { ResponseUserData } from '../model/user.model';
import { UserDataScheme, userActions } from '../slices/userSlice';
import { mapUserResponseDataToData } from './converters/user';

export const thunkAuth = (): AppThunk<Promise<any>> => {
    return async dispatch => {
        try {
            const { data } = await axiosInstance.post<ResponseUserData>('/auth/me');
            dispatch(userActions.setUserData(mapUserResponseDataToData(data)));
            dispatch(userActions.setAuthed(true));
        } catch (err) {
            dispatch(userActions.setAuthed(false));
        }
        return Promise.resolve();
    };
};
