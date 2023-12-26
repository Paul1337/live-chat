import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RequestExtended } from 'src/auth/model/request.model';
import { Chat } from '../schemas/chat.schema';

@Injectable()
export class VerifyUserChatGuard implements CanActivate {
    constructor(
        // private reflector: Reflector,
        @InjectModel(Chat.name) private chatModel: Model<Chat>,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log('verify chat guard');

        if (context.getType() === 'http') {
            const htppRequest = context.switchToHttp().getRequest() as RequestExtended;

            const userId = htppRequest['user'].id;
            const chatId = htppRequest.params['id'];

            console.log('userId', userId);
            console.log('chatId', chatId);

            const chats = await this.chatModel.find({
                _id: new Types.ObjectId(chatId),
                users: new Types.ObjectId(userId),
            });
            return chats.length === 1;
        } else if (context.getType() === 'ws') {
        }

        return true;
    }
}
