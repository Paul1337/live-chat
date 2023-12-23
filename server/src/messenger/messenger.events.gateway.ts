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
import { UsersService } from 'src/users/users.service';

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
        private usersService: UsersService,
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

    @SubscribeMessage('message')
    async handleNewMessage(@ConnectedSocket() client: Socket, @MessageBody() messageDto: MessageDto) {
        // const chat = await this.chatModel.findOne(new Types.ObjectId(messageDto.chatId)).exec();
        // if (!chat.users[0]
        // check that chat.users contains messageDto.owner

        console.log('messageDto', messageDto);
        const userId = messageDto.owner;

        const user = await this.usersService.findOne({ _id: userId });
        if (!user) throw new InternalServerErrorException('Message owner user is not found!');

        const newMessage = new this.messageModel({
            text: messageDto.text,
            img: messageDto.img,
            owner: new Types.ObjectId(userId),
            chatId: new Types.ObjectId(messageDto.chatId),
            ownerData: {
                firstName: user.firstName,
                lastName: user.lastName,
            },
        });
        await newMessage.save();

        console.log('saved message', newMessage);
        const chat = await this.chatModel.findOne(new Types.ObjectId(messageDto.chatId));
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
