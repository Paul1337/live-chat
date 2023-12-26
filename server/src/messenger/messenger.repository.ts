import { Injectable, InternalServerErrorException, Type } from '@nestjs/common';
import { Message } from './schemas/message.schema';
import { Model, Types } from 'mongoose';
import { Chat } from './schemas/chat.schema';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Unread } from './schemas/unread.schema';

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
    private MaxMessagesCount: number;

    constructor(
        @InjectModel(Chat.name) private chatModel: Model<Chat>,
        @InjectModel(Message.name) private messageModel: Model<Message>,
        @InjectModel(Unread.name) private unreadModel: Model<Unread>,
    ) {
        this.MaxMessagesCount = 30;
    }

    async loadChatsWithUserdata(userId: Types.ObjectId) {
        console.log('loading chats for user', userId);
        const chats = await this.chatModel.aggregate([
            {
                $match: {
                    users: userId,
                },
            },
            {
                $lookup: {
                    as: 'unreads',
                    from: 'unreads',
                    localField: '_id',
                    foreignField: 'chatId',
                    pipeline: [
                        {
                            $match: {
                                userId: userId,
                            },
                        },
                        {
                            $project: {
                                _id: 0,
                                count: 1,
                            },
                        },
                    ],
                },
            },
            // {
            //     $set: {
            //         unreadCount: 0,
            //     },
            // },
            {
                $set: {
                    unreadCount: {
                        $arrayElemAt: ['$unreads.count', 0],
                    },
                },
            },
            {
                $unset: 'unreads',
            },
        ]);

        const chatsWithUserData = await this.chatModel.populate(chats, {
            path: 'users',
            options: {
                projection: {
                    username: 1,
                    firstName: 1,
                    lastName: 1,
                    profileImg: 1,
                },
            },
        });

        return chatsWithUserData;
    }

    async loadChatById(chatId: Types.ObjectId) {
        return this.chatModel.findOne(chatId).exec();
    }

    async markNewMessageAndGetChat(chatId: Types.ObjectId, msgOwnerId: Types.ObjectId, count: number) {
        const chat = await this.loadChatById(chatId);
        const userIds = chat.users.filter(userId => !userId.equals(msgOwnerId));

        const updResult = await this.unreadModel.updateMany(
            {
                chatId,
                userId: {
                    $in: userIds,
                },
            },
            {
                $inc: {
                    count: count,
                },
            },
        );

        if (updResult.modifiedCount === 0) {
            const unreadCreatePromises = [];
            for (const userId of userIds) {
                unreadCreatePromises.push(
                    this.unreadModel.create({
                        chatId,
                        userId,
                        count,
                    }),
                );
            }
            await Promise.all(unreadCreatePromises);
        }

        await this.chatModel
            .updateOne(
                {
                    _id: chatId,
                },
                {
                    lastActivity: new Date(),
                },
            )
            .exec();

        return chat;
    }

    async resetChatUnread(chatId: Types.ObjectId, userId: Types.ObjectId) {
        await this.unreadModel
            .updateOne(
                {
                    chatId,
                    userId,
                },
                {
                    $set: {
                        count: 0,
                    },
                },
            )
            .exec();
    }

    async loadChatMessages(chatId: Types.ObjectId) {
        console.log('loading messages for chat', chatId);
        const count = await this.messageModel.countDocuments({
            chatId,
        });
        console.log('count', count);
        const messages = await this.messageModel
            .find({
                chatId: chatId,
            })
            .skip(Math.max(count - this.MaxMessagesCount, 0))
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

    async verifyUserHasChat(userId: Types.ObjectId, chatId: Types.ObjectId) {
        const chats = await this.chatModel.find({
            _id: chatId,
            users: userId,
        });
        return chats.length === 1;
    }
}
