import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { RemoveMessageDto } from '../dto/remove-message.dto';
import { EditMessageDto } from '../dto/edit-message.dto';
import { Message } from '../schemas/message.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from '../schemas/chat.schema';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { CreatePrivateChatDto } from '../dto/create-chat.dto';
import { MessageService } from './message.service';
import { Unread } from '../schemas/unread.schema';

export interface PopulatedUser {
    username: string;
    firstName: string;
    lastName: string;
    profileImg?: string;
}

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Chat.name) private chatModel: Model<Chat>,
        @InjectModel(Unread.name) private unreadModel: Model<Unread>,
        private usersService: UsersService,
        private messageService: MessageService
    ) {}

    async getChatById(chatId: string) {
        return this.chatModel.findById(new Types.ObjectId(chatId));
    }

    async getUserChatsWithDetailedData(userId: string) {
        const chats = await this.chatModel.aggregate([
            {
                $match: {
                    users: new Types.ObjectId(userId),
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
                                userId: new Types.ObjectId(userId),
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

    async createPrivateChat(userId: string, chatDto: CreatePrivateChatDto) {
        const { username } = chatDto;
        const recepient = await this.usersService.findOne({ username: username });
        if (!recepient) throw new InternalServerErrorException(`No user with username ${username}`);

        const { _id: recipientId } = recepient;
        const chat = await this.findPrivateChat(userId, recipientId.toString());
        const chatExists = Boolean(chat);
        if (chatExists) throw new InternalServerErrorException('Chat already exists');

        const newChat = await this.chatModel.create({
            users: [new Types.ObjectId(userId), recipientId],
        });

        const newChatPopulated = await newChat.populate<{ users: PopulatedUser[] }>('users', [
            'username',
            'firstName',
            'lastName',
            'profileImg',
        ]);

        return newChatPopulated;
    }

    async findPrivateChat(userId: string, recipientId: string) {
        return this.chatModel
            .findOne({
                $and: [
                    {
                        users: {
                            $size: 2,
                        },
                    },
                    { users: new Types.ObjectId(userId) },
                    { users: new Types.ObjectId(recipientId) },
                ],
            })
            .exec();
    }

    async readChatMessages(userId: string, chatId: string) {
        await this.messageService.readChatMessages(chatId, userId);
        await this.resetChatUnread(userId, chatId);
    }

    async resetChatUnread(userId: string, chatId: string) {
        await this.unreadModel
            .updateOne(
                {
                    chatId: new Types.ObjectId(chatId),
                    userId: new Types.ObjectId(userId),
                },
                {
                    $set: {
                        count: 0,
                    },
                }
            )
            .exec();
    }

    async verifyUserHasChat(userId: string, chatId: string) {
        const chats = await this.chatModel.find({
            _id: new Types.ObjectId(chatId),
            users: new Types.ObjectId(userId),
        });

        if (chats.length !== 1) {
            throw new ForbiddenException('User does not have access to this chat!');
        }
    }

    async markNewMessageInChat(chatId: string, messageOwnerId: string) {
        const messageOwnerOid = new Types.ObjectId(messageOwnerId);
        const chat = await this.chatModel.findOne(new Types.ObjectId(chatId));
        const otherUsersIds = chat.users.filter(userId => !userId.equals(messageOwnerOid));

        const updResult = await this.unreadModel.updateMany(
            {
                chatId: new Types.ObjectId(chatId),
                userId: {
                    $in: otherUsersIds,
                },
            },
            {
                $inc: {
                    count: 1,
                },
            }
        );

        if (updResult.modifiedCount === 0) {
            const unreadCreatePromises = [];
            for (const userId of otherUsersIds) {
                unreadCreatePromises.push(
                    this.unreadModel.create({
                        chatId: new Types.ObjectId(chatId),
                        userId: new Types.ObjectId(userId),
                        count: 1,
                    })
                );
            }
            await Promise.all(unreadCreatePromises);
        }

        await this.chatModel
            .updateOne(
                {
                    _id: new Types.ObjectId(chatId),
                },
                {
                    lastActivity: new Date(),
                }
            )
            .exec();

        return chat;
    }
}
