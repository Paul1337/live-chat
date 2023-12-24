import { axiosInstance } from '../../app/api/apiInstance';
import { AppThunk } from '../../app/model/store.model';
import { UserProfileData, userActions } from '../../auth/slices/userSlice';

interface UserProfileDataResponse {
    profileImg?: string;
    firstName: string;
    lastName: string;
}

export const thunkLoadUserProfileData = (): AppThunk => {
    return async (dispatch, getState) => {
        const { data } = await axiosInstance.get<UserProfileDataResponse>('/profile/data');
        dispatch(
            userActions.setProfileData({
                photo: data.profileImg,
                firstName: data.firstName,
                lastName: data.lastName,
            })
        );
    };
};
