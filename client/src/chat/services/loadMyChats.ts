import { ChatDto, ChatScheme } from '../model/chat.model';
import { chatActions } from '../slices/chatSlice';
import { axiosInstance } from '../../app/api/apiInstance';
import { AppThunk } from '../../app/model/store.model';

const mapChatDtoToScheme =
    (userData: any) =>
    (chatResp: ChatDto): ChatScheme => {
        let chatName = '';
        const isPrivateChat = chatResp.users.length === 2;
        if (isPrivateChat) {
            const secondUser = chatResp.users.find(user => user.username !== userData.username)!;
            const { firstName, lastName } = secondUser;
            chatName = `${firstName} ${lastName}`;
        } else {
            chatName = chatResp.groupName ?? `Group`;
        }
        return {
            name: chatName,
            chatId: chatResp._id,
        };
    };

export const thunkLoadChats = (): AppThunk => {
    return async (dispatch, getState) => {
        dispatch(chatActions.setIsLoadingChats(true));
        const { data } = await axiosInstance.get<Array<ChatDto>>('/messenger/chats');

        const userData = getState().user.userData!;
        dispatch(chatActions.setChats(data.map(mapChatDtoToScheme(userData))));
        dispatch(chatActions.setIsLoadingChats(false));
    };
};
