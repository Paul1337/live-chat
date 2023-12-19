import { axiosInstance } from '../../app/api/apiInstance';
import { AppThunk } from '../../app/model/store.model';
import { MessageScheme } from '../model/message.model';
import { messengerActions } from '../slices/messengerSlice';

export const thunkLoadChatMessages = (chatId: string): AppThunk => {
    return async (dispatch, getState) => {
        console.log('load messages', chatId);
        dispatch(messengerActions.setIsLoadingMessages(true));
        const { data } = await axiosInstance.get<Array<MessageScheme>>(`/messenger/chats/${chatId}`);
        console.log('res', data);
        dispatch(
            messengerActions.setMessages(
                data
                // data.map(msgResp => ({
                //     id: msgResp._id,
                //     text: msgResp.text,
                //     date: msgResp.createdAt,
                // }))
            )
        );
        dispatch(messengerActions.setIsLoadingMessages(false));
    };
};
