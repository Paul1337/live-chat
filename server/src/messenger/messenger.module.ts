import { Module } from '@nestjs/common';
import { MessengerService } from './messenger.service';
import { MessengerController } from './messenger.controller';
import { EventsGateway } from './messenger.events.gateway';
import { Message, MessageSchema } from './schemas/message.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { Chat, ChatSchema } from './schemas/chat.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Message.name, schema: MessageSchema },
            {
                name: Chat.name,
                schema: ChatSchema,
            },
        ]),
        UsersModule,
        AuthModule,
    ],
    controllers: [MessengerController],
    providers: [MessengerService, EventsGateway],
})
export class MessengerModule {}
