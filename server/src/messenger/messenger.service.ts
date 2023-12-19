import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Chat } from './schemas/chat.schema';
import { Message } from './schemas/message.schema';

export interface PopulatedUser {
    username: string;
    firstName: string;
    lastName: string;
}

@Injectable()
export class MessengerService {
    constructor(
        @InjectModel(Chat.name) private chatModel: Model<Chat>,
        @InjectModel(Message.name) private messageModel: Model<Message>,
    ) {}

    async getUserChats(userId: string) {
        console.log('get chats for', userId);
        const chats = await this.chatModel
            .find({
                users: new Types.ObjectId(userId),
            })
            .populate<{
                users: Array<PopulatedUser>;
            }>('users', ['username', 'firstName', 'lastName'])
            .exec();

        return chats;
    }

    async getChatMessages(userId: string, chatId: string): Promise<Message[]> {
        const messages = await this.messageModel
            .find({
                chatId: new Types.ObjectId(chatId),
            })
            .exec();
        return messages;
    }
}
