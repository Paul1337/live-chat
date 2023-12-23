import { UserDataScheme } from '../../../auth/slices/userSlice';
import { ChatResponse, ChatScheme } from '../../model/chat.model';

export const mapChatResponseToScheme =
    (userData: UserDataScheme) =>
    (chatResp: ChatResponse): ChatScheme => {
        let chatName = '';
        const isPrivateChat = chatResp.users.length === 2;
        if (isPrivateChat) {
            const secondUser = chatResp.users.find(user => user.username !== userData.username)!;
            const { firstName, lastName } = secondUser;
            chatName = `${firstName} ${lastName}`;
        } else {
            chatName = chatResp.groupName ?? `Group (${chatResp.users.length})`;
        }
        return {
            name: chatName,
            chatId: chatResp._id,
        };
    };
