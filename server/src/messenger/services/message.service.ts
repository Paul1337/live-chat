import { Injectable } from '@nestjs/common';
import { RemoveMessageDto } from '../dto/remove-message.dto';
import { EditMessageDto } from '../dto/edit-message.dto';
import { Message } from '../schemas/message.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/user.schema';

interface CreateMessageData {
    text: string;
    img: string;
    chatId: Types.ObjectId;
}

@Injectable()
export class MessageService {
    private MaxMessagesCount: number;

    constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {
        this.MaxMessagesCount = 35;
    }

    async tryRemoveMessage(userId: string, removeMessageDto: RemoveMessageDto): Promise<boolean> {
        const deleteResult = await this.messageModel
            .deleteOne({
                owner: new Types.ObjectId(userId),
                _id: new Types.ObjectId(removeMessageDto.messageId),
                chatId: new Types.ObjectId(removeMessageDto.chatId),
            })
            .exec();

        return deleteResult.deletedCount === 1;
    }

    async tryEditMessage(userId: string, editMessageDto: EditMessageDto): Promise<boolean> {
        const editResult = await this.messageModel
            .updateOne(
                {
                    owner: new Types.ObjectId(userId),
                    _id: new Types.ObjectId(editMessageDto.messageId),
                    chatId: new Types.ObjectId(editMessageDto.chatId),
                },
                {
                    text: editMessageDto.text,
                    img: editMessageDto.img,
                }
            )
            .exec();

        return editResult.modifiedCount === 1;
    }

    async getChatMessages(chatId: string) {
        console.log('loading messages for chat', chatId);
        const count = await this.messageModel.countDocuments({
            chatId: new Types.ObjectId(chatId),
        });
        console.log('count', count);
        const messages = await this.messageModel
            .find({
                chatId: new Types.ObjectId(chatId),
            })
            .skip(Math.max(count - this.MaxMessagesCount, 0))
            .exec();
        return messages;
    }

    async readChatMessages(chatId: string, userId: string) {
        await this.messageModel
            .updateMany(
                {
                    isRead: false,
                    chatId: new Types.ObjectId(chatId),
                    owner: {
                        $ne: new Types.ObjectId(userId),
                    },
                },
                {
                    $set: {
                        isRead: true,
                    },
                }
            )
            .exec();
    }

    async createMessage(data: CreateMessageData, user: User) {
        const newMessage = new this.messageModel({
            text: data.text,
            img: data.img,
            owner: user._id,
            chatId: new Types.ObjectId(data.chatId),
            ownerData: {
                firstName: user.firstName,
                lastName: user.lastName,
            },
        });
        await newMessage.save();
        return newMessage;
    }
}
