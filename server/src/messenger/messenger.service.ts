import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Types } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { CreatePrivateChatDto } from './dto/create-chat.dto';
import { MessengerRepository } from './messenger.repository';
import { Message } from './schemas/message.schema';

@Injectable()
export class MessengerService {
    constructor(
        private usersService: UsersService,
        private messengerRepository: MessengerRepository,
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
        await this.messengerRepository.markReadMessages(
            new Types.ObjectId(userId),
            new Types.ObjectId(chatId),
        );
        await this.messengerRepository.resetChatUnread(new Types.ObjectId(chatId));
    }

    async readMessage(userId: string, messageId: string) {
        await this.messengerRepository.markReadMessage(
            new Types.ObjectId(userId),
            new Types.ObjectId(messageId),
        );
    }

    async markNewMessageInChat(chatId: string) {
        const chatOid = new Types.ObjectId(chatId);
        const chat = await this.messengerRepository.loadChatById(chatOid);
        await this.messengerRepository.addChatUnread(chatOid, 1);

        return chat;
    }
}
