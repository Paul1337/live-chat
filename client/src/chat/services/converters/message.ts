import { MessageResponse, MessageScheme } from '../../model/message.model';

export const mapMessageResponseToScheme = (messageDto: MessageResponse): MessageScheme => ({
    chatId: messageDto.chatId,
    owner: messageDto.owner,
    _id: messageDto._id,
    img: messageDto.img,
    text: messageDto.text,
    createdAt: messageDto.createdAt,
    ownerData: messageDto.ownerData,
});
