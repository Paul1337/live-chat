import { UserDataScheme } from '../../../auth/slices/userSlice';
import { ChatDto, ChatScheme } from '../../model/chat.model';

export const mapChatDtoToScheme =
    (userData: UserDataScheme) =>
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
