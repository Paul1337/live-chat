import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Chat } from './schemas/chat.schema';
import { Message } from './schemas/message.schema';
import { CreatePrivateChatDto } from './dto/create-chat.dto';
import { UsersService } from 'src/users/users.service';

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
        private usersService: UsersService,
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

    async createPrivateChat(userId: string, chatDto: CreatePrivateChatDto) {
        const { username } = chatDto;
        const recepient = await this.usersService.findOne({
            username: username,
        });
        if (!recepient) throw new InternalServerErrorException(`No user with username ${username}`);

        const { _id: recipientId } = recepient;

        console.log('user id', userId);
        console.log('recipient id', recipientId);

        const chat = await this.chatModel
            .findOne({
                $and: [
                    {
                        users: {
                            $size: 2,
                        },
                    },
                    {
                        users: new Types.ObjectId(userId),
                    },
                    {
                        users: recipientId,
                    },
                ],
            })
            .exec();
        console.log('chat', chat);
        const chatExists = Boolean(chat);

        if (chatExists) throw new InternalServerErrorException('Chat already exists');

        const newChat = await this.chatModel.create({
            users: [new Types.ObjectId(userId), recipientId],
        });
        const newChatPopulated = await newChat.populate<{
            users: Array<PopulatedUser>;
        }>('users', ['username', 'firstName', 'lastName']);

        console.log(newChat);

        return newChatPopulated;
    }
}
