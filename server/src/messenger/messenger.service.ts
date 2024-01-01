import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Types } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { CreatePrivateChatDto } from './dto/create-chat.dto';
import { MessengerRepository } from './messenger.repository';
import { Message } from './schemas/message.schema';
import { EditMessageDto } from './dto/edit-message.dto';
import { RemoveMessageDto } from './dto/remove-message.dto';

@Injectable()
export class MessengerService {
    constructor(
        private usersService: UsersService,
        private messengerRepository: MessengerRepository
    ) {}

    async getUserChats(userId: string) {
        return this.messengerRepository.loadChatsWithUserdata(new Types.ObjectId(userId));
    }

    async getChatMessages(userId: string, chatId: string): Promise<Message[]> {
        return this.messengerRepository.loadChatMessages(new Types.ObjectId(chatId));
    }

    async createPrivateChat(userId: string, chatDto: CreatePrivateChatDto) {
        const { username } = chatDto;
        const recepient = await this.usersService.findOne({
            username: username,
        });
        if (!recepient) throw new InternalServerErrorException(`No user with username ${username}`);

        const { _id: recipientId } = recepient;

        console.log('user id', userId);
        console.log('recipient id', recipientId);
        const userOid = new Types.ObjectId(userId);

        const chat = await this.messengerRepository.findPrivateChat(userOid, recipientId);
        const chatExists = Boolean(chat);
        if (chatExists) throw new InternalServerErrorException('Chat already exists');

        const newChat = await this.messengerRepository.createPrivateChat(userOid, recipientId);

        console.log('new chat', newChat);

        return newChat;
    }

    async readChatMessages(userId: string, chatId: string) {
        const chatOid = new Types.ObjectId(chatId);
        const userOid = new Types.ObjectId(userId);
        await this.messengerRepository.markReadMessages(userOid, chatOid);
        await this.messengerRepository.resetChatUnread(chatOid, userOid);
    }

    async markNewMessageInChat(chatId: string, messageOwnerId: string) {
        const chatOid = new Types.ObjectId(chatId);
        const messageOwnerOid = new Types.ObjectId(messageOwnerId);

        const chat = await this.messengerRepository.markNewMessageAndGetChat(chatOid, messageOwnerOid, 1);

        return chat;
    }
}
