import { axiosInstance } from '../../app/api/apiInstance';
import { AppThunk } from '../../app/model/store.model';
import { MessageDto, MessageScheme } from '../model/message.model';
import { messengerActions } from '../slices/messengerSlice';

const mapMessageDtoToScheme = (messageDto: MessageDto): MessageScheme => ({
    ...messageDto,
});

export const thunkLoadChatMessages = (chatId: string): AppThunk => {
    return async (dispatch, getState) => {
        console.log('load messages', chatId);
        dispatch(messengerActions.setIsLoadingMessages(true));
        const { data } = await axiosInstance.get<Array<MessageDto>>(`/messenger/chats/${chatId}`);
        console.log('Loaded chat messages:', data);
        dispatch(messengerActions.setMessages(data.map(mapMessageDtoToScheme)));
        dispatch(messengerActions.setIsLoadingMessages(false));
    };
};
