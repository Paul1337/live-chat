import { axiosInstance } from '../../app/api/apiInstance';
import { AppThunk } from '../../app/model/store.model';
import { ChatResponse } from '../model/chat.model';
import { chatActions } from '../slices/chatSlice';
import { mapChatResponseToScheme } from './converters/chat';

interface CreatePrivateChatRequest {
    username: string;
}

export const thunkTryCreatePrivateChat = (data: CreatePrivateChatRequest): AppThunk<Promise<any>> => {
    return async (dispatch, getState) => {
        const user = getState().user.userData!;
        const response = await axiosInstance.post<ChatResponse>('/messenger/chats/createPrivate', data);
        const chatScheme = mapChatResponseToScheme(user)(response.data);
        console.log('chat scheme ', chatScheme);
        dispatch(chatActions.addChat(chatScheme));
        return Promise.resolve();
    };
};
