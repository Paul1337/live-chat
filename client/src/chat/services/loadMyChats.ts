import { ChatDto, ChatScheme } from '../model/chat.model';
import { chatActions } from '../slices/chatSlice';
import { axiosInstance } from '../../app/api/apiInstance';
import { AppThunk } from '../../app/model/store.model';
import { mapChatDtoToScheme } from './converters/chat';

export const thunkLoadChats = (): AppThunk => {
    return async (dispatch, getState) => {
        dispatch(chatActions.setIsLoadingChats(true));
        const { data } = await axiosInstance.get<Array<ChatDto>>('/messenger/chats');

        const userData = getState().user.userData!;
        dispatch(chatActions.setChats(data.map(mapChatDtoToScheme(userData))));
        dispatch(chatActions.setIsLoadingChats(false));
    };
};
