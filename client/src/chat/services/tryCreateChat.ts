import { axiosInstance } from '../../app/api/apiInstance';
import { AppThunk } from '../../app/model/store.model';
import { ChatDto } from '../model/chat.model';
import { chatActions } from '../slices/chatSlice';
import { mapChatDtoToScheme } from './converters/chat';

interface CreatePrivateChatData {
    username: string;
}

export const thunkTryCreatePrivateChat = (data: CreatePrivateChatData): AppThunk<Promise<any>> => {
    return async (dispatch, getState) => {
        const user = getState().user.userData!;
        const response = await axiosInstance.post<ChatDto>('/messenger/chats/createPrivate', data);
        const chatScheme = mapChatDtoToScheme(user)(response.data);
        console.log('chat scheme ', chatScheme);
        dispatch(chatActions.addChat(chatScheme));
        return Promise.resolve();
    };
};
