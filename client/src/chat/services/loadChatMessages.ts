import { axiosInstance } from '../../app/api/apiInstance';
import { AppThunk } from '../../app/model/store.model';
import { MessageResponse, MessageScheme } from '../model/message.model';
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
    };
};
