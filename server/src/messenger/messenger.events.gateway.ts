import { InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
} from '@nestjs/websockets';
import { Model, Types } from 'mongoose';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { MessageDto } from './dto/message.dto';
import { Chat } from './schemas/chat.schema';
import { Message } from './schemas/message.schema';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
// @UseGuards(AuthWSGuard)
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    clients: Map<string, Socket>;

    constructor(
        @InjectModel(Message.name) private messageModel: Model<Message>,
        private authService: AuthService,
        @InjectModel(Chat.name) private chatModel: Model<Chat>,
    ) {
        this.clients = new Map();
    }

    async handleConnection(@ConnectedSocket() client: Socket) {
        // const authHeader = client.handshake.headers.authorization;
        const token = client.handshake.auth.token;
        const payload = await this.authService.verifyToken(token);
        this.clients.set(payload.id, client);
        console.log('connected');
    }

    async handleDisconnect(@ConnectedSocket() client: Socket) {
        console.log('disconnected');
    }

    @SubscribeMessage('message')
    async handleNewMessage(@ConnectedSocket() client: Socket, @MessageBody() messageDto: MessageDto) {
        // const chat = await this.chatModel.findOne(new Types.ObjectId(messageDto.chatId)).exec();
        // if (!chat.users[0]
        // check that chat.users contains messageDto.to and messageDto.owner

        console.log('messageDto', messageDto);
        const userId = messageDto.owner;

        const newMessage = new this.messageModel({
            text: messageDto.text,
            img: messageDto.img,
            owner: new Types.ObjectId(userId),
            chatId: new Types.ObjectId(messageDto.chatId),
        });
        await newMessage.save();

        console.log('saved message', newMessage);
        const rightClient = this.clients.get(messageDto.to);
        if (rightClient) {
            console.log('right client online, so sending message');
            rightClient.emit('message', newMessage);
        }
        return newMessage;
    }
}
