import { axiosInstance } from '../../app/api/apiInstance';
import { AppThunk } from '../../app/model/store.model';
import { userActions } from '../../auth/slices/userSlice';

interface UploadPhotoRequest {
    file: any;
}

interface UploadPhotoResponse {
    profileImg: string;
}

export const thunkUploadPhoto = (data: UploadPhotoRequest): AppThunk => {
    return async (dispatch, getState) => {
        if (data.file) {
            const bodyFormData = new FormData();
            bodyFormData.append('file', data.file);
            const { data: response } = await axiosInstance.post<UploadPhotoResponse>(
                '/profile/uploadPhoto',
                bodyFormData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log(response.profileImg);
            dispatch(userActions.setProfileImg(response.profileImg));
        }

        // const user = getState().user.userData!;
        // const response = await axiosInstance.post<ChatResponse>('/messenger/chats/createPrivate', data);
        // const chatScheme = mapChatResponseToScheme(user)(response.data);
        // console.log('chat scheme ', chatScheme);
        // dispatch(chatActions.addChat(chatScheme));
        // return Promise.resolve();
    };
};
