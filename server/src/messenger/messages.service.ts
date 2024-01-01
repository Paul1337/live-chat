import { Injectable } from '@nestjs/common';
import { RemoveMessageDto } from './dto/remove-message.dto';
import { EditMessageDto } from './dto/edit-message.dto';
import { Message } from './schemas/message.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MessagesService {
    constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {}

    async tryRemoveMessage(userId: string, removeMessageDto: RemoveMessageDto): Promise<boolean> {
        return false;
    }
    async tryEditMessage(userId: string, editMessageDto: EditMessageDto): Promise<boolean> {
        return false;
    }
}
