import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { MessengerController } from './messenger.controller';
import { EventsGateway } from './messenger.events.gateway';
import { Chat, ChatSchema } from './schemas/chat.schema';
import { Message, MessageSchema } from './schemas/message.schema';
import { Unread, UnreadSchema } from './schemas/unread.schema';
import { MessageService } from './services/message.service';
import { ChatService } from './services/chat.service';
import { MessengerService } from './services/messenger.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Message.name, schema: MessageSchema },
            {
                name: Chat.name,
                schema: ChatSchema,
            },
            {
                name: Unread.name,
                schema: UnreadSchema,
            },
        ]),
        UsersModule,
        AuthModule,
    ],
    controllers: [MessengerController],
    providers: [EventsGateway, MessageService, ChatService, MessengerService],
})
export class MessengerModule {}
