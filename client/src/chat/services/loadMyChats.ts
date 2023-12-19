import { ChatDto } from '../model/chat.model';
import { chatActions } from '../slices/chatSlice';
import { axiosInstance } from '../../app/api/apiInstance';
import { AppThunk } from '../../app/model/store.model';

export const thunkLoadChats = (): AppThunk => {
    return async (dispatch, getState) => {
        const { data } = await axiosInstance.get<Array<ChatDto>>('/messenger/chats');

        dispatch(
            chatActions.setChats(
                data.map(chatResp => ({
                    name: chatResp.users[0].username + '-' + chatResp.users[1].username,
                    chatId: chatResp._id,
                }))
            )
        );
    };
};
