import { axiosInstance } from '../../app/api/apiInstance';
import { ioClient } from '../../app/api/socketInstance';
import { AppThunk } from '../../app/model/store.model';
import { MessageResponse } from '../model/message.model';
import { messengerActions } from '../slices/messengerSlice';
import { mapMessageResponseToScheme } from './converters/message';

export const thunkLoadChatMessages = (chatId: string): AppThunk => {
    return async (dispatch, getState) => {
        console.log('load messages', chatId);
        dispatch(messengerActions.setIsLoadingMessages(true));
        const { data } = await axiosInstance.get<Array<MessageResponse>>(`/messenger/chats/${chatId}`);
        console.log('Loaded chat messages:', data);
        dispatch(messengerActions.setMessages(data.map(mapMessageResponseToScheme)));
        dispatch(messengerActions.setIsLoadingMessages(false));

        const userData = getState().user.userData!;
        ioClient.emit('read', {
            userId: userData.id,
            chatId: chatId,
        });
    };
};
