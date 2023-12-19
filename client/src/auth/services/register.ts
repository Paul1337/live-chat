import { AxiosError } from 'axios';
import { axiosInstance } from '../../app/api/apiInstance';
import { AppThunk } from '../../app/model/store.model';

interface ThunkRegisterData {
    email: string;
    username: string;
    password: string;
}

interface RegResponse {}

export const thunkRegister = (data: ThunkRegisterData): AppThunk<Promise<any>> => {
    return async dispatch => {
        const response = await axiosInstance.post<RegResponse>('/auth/reg', data);
        return Promise.resolve();
    };
};
