import { UserDataScheme } from '../../../auth/slices/userSlice';
import { ChatResponse, ChatScheme } from '../../model/chat.model';

export const mapChatResponseToScheme =
    (userData: UserDataScheme) =>
    (chatResp: ChatResponse): ChatScheme => {
        let chatName = '';
        let photo: string | undefined = undefined;
        const isPrivateChat = chatResp.users.length === 2;
        if (isPrivateChat) {
            const secondUser = chatResp.users.find(user => user.username !== userData.username)!;
            const { firstName, lastName, profileImg } = secondUser;
            chatName = `${firstName} ${lastName}`;
            photo = profileImg;
        } else {
            chatName = chatResp.groupName ?? `Group (${chatResp.users.length})`;
        }
        return {
            name: chatName,
            unreadCount: chatResp.unreadCount,
            chatId: chatResp._id,
            photo: photo,
        };
    };
