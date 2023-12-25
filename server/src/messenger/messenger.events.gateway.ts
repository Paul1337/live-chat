import { InternalServerErrorException } from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
} from '@nestjs/websockets';
import { Types } from 'mongoose';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { MessageDto } from './dto/message.dto';
import { ReadMessageDto } from './dto/read-message.dto';
import { MessengerRepository } from './messenger.repository';
import { MessengerService } from './messenger.service';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
// @UseGuards(AuthWSGuard)
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    clients: Map<string, Socket>;

    constructor(
        private authService: AuthService,
        private usersService: UsersService,
        private messengerService: MessengerService,
        private messengerRepository: MessengerRepository,
    ) {
        this.clients = new Map();
    }

    async handleConnection(@ConnectedSocket() client: Socket) {
        const token = client.handshake.auth.token;
        const payload = await this.authService.verifyToken(token);
        this.clients.set(payload.id, client);
        console.log('connected');
    }

    async handleDisconnect(@ConnectedSocket() client: Socket) {
        console.log('disconnected');
    }

    @SubscribeMessage('read')
    async readMessages(@MessageBody() readMessageDto: ReadMessageDto) {
        const { chatId, userId } = readMessageDto;
        console.log('Got read event', chatId, userId);
        await this.messengerService.readChatMessages(userId, chatId);
        const chat = await this.messengerRepository.loadChatById(new Types.ObjectId(chatId));
        for (const user of chat.users) {
            if (user.toString() === userId) continue;
            const rightClient = this.clients.get(user.toString());
            if (rightClient) {
                rightClient.emit('read', readMessageDto);
            }
        }
    }

    @SubscribeMessage('message')
    async handleNewMessage(@ConnectedSocket() client: Socket, @MessageBody() messageDto: MessageDto) {
        // const chat = await this.chatModel.findOne(new Types.ObjectId(messageDto.chatId)).exec();
        // if (!chat.users[0]
        // check that chat.users contains messageDto.owner

        console.log('messageDto', messageDto);
        const userId = messageDto.owner;

        const user = await this.usersService.findOne({ _id: userId });
        if (!user) throw new InternalServerErrorException('Message owner user is not found!');

        const newMessage = await this.messengerRepository.createMessage(
            {
                chatId: new Types.ObjectId(messageDto.chatId),
                img: messageDto.img,
                text: messageDto.text,
            },
            user,
        );

        console.log('saved message', newMessage);
        const chat = await this.messengerService.markNewMessageInChat(messageDto.chatId);

        for (const user of chat.users) {
            if (user.toString() === userId) continue;
            const rightClient = this.clients.get(user.toString());
            if (rightClient) {
                console.log(`right client ${user.toString()} is online, so sending message`);
                rightClient.emit('message', newMessage);
            }
        }
        return newMessage;
    }
}
