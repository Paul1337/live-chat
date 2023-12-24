import { Injectable, InternalServerErrorException, Type } from '@nestjs/common';
import { Message } from './schemas/message.schema';
import { Model, Types } from 'mongoose';
import { Chat } from './schemas/chat.schema';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/user.schema';

export interface PopulatedUser {
    username: string;
    firstName: string;
    lastName: string;
    profileImg?: string;
}

interface CreateMessageData {
    text: string;
    img: string;
    chatId: Types.ObjectId;
}

@Injectable()
export class MessengerRepository {
    constructor(
        @InjectModel(Chat.name) private chatModel: Model<Chat>,
        @InjectModel(Message.name) private messageModel: Model<Message>,
    ) {}

    async loadChatsWithUserdata(userId: Types.ObjectId) {
        console.log('loading chats for user', userId);
        const chats = await this.chatModel
            .find({
                users: userId,
            })
            .populate<{ users: Array<PopulatedUser> }>('users', [
                'username',
                'firstName',
                'lastName',
                'profileImg',
            ])
            .exec();

        return chats;
    }

    async loadChatById(chatId: Types.ObjectId) {
        return this.chatModel.findOne(chatId).exec();
    }

    async addChatUnread(chatId: Types.ObjectId, count: number) {
        await this.chatModel
            .updateOne(
                {
                    _id: chatId,
                },
                {
                    $inc: {
                        unreadCount: count,
                    },
                },
            )
            .exec();
    }

    async resetChatUnread(chatId: Types.ObjectId) {
        await this.chatModel
            .updateOne(
                {
                    _id: chatId,
                },
                {
                    $set: {
                        unreadCount: 0,
                    },
                },
            )
            .exec();
    }

    async loadChatMessages(chatId: Types.ObjectId) {
        console.log('loading messages for chat', chatId);
        const count = await this.messageModel.countDocuments();
        const messages = await this.messageModel
            .find({
                chatId: chatId,
            })
            .skip(Math.max(count - 32, 0))
            .exec();
        return messages;
    }

    async findPrivateChat(userId: Types.ObjectId, recipientId: Types.ObjectId) {
        return this.chatModel
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
    }

    async createPrivateChat(userId: Types.ObjectId, recipientId: Types.ObjectId) {
        const newChat = await this.chatModel.create({
            users: [userId, recipientId],
        });

        const newChatPopulated = await newChat.populate<{ users: Array<PopulatedUser> }>('users', [
            'username',
            'firstName',
            'lastName',
            'profileImg',
        ]);
        return newChatPopulated;
    }

    async markReadMessages(userId: Types.ObjectId, chatId: Types.ObjectId) {
        await this.messageModel
            .updateMany(
                {
                    isRead: false,
                    chatId: chatId,
                    owner: {
                        $ne: userId,
                    },
                },
                {
                    $set: {
                        isRead: true,
                    },
                },
            )
            .exec();
    }

    async markReadMessage(userId: Types.ObjectId, messageId: Types.ObjectId) {
        await this.messageModel
            .updateOne(
                {
                    isRead: false,
                    _id: messageId,
                },
                {
                    $set: {
                        isRead: true,
                    },
                },
            )
            .exec();
    }

    async createMessage(data: CreateMessageData, user: User) {
        const newMessage = new this.messageModel({
            text: data.text,
            img: data.img,
            owner: user._id,
            chatId: data.chatId,
            ownerData: {
                firstName: user.firstName,
                lastName: user.lastName,
            },
        });
        await newMessage.save();
        return newMessage;
    }
}
