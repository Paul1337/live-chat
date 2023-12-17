import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { MessageDto } from './dto/message.dto';
import { Message, MessageSchema } from './schemas/message.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { InternalServerErrorException } from '@nestjs/common';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class EventsGateway {
    constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {}

    @SubscribeMessage('connection')
    handleConnection() {
        console.log('on connected');
    }

    @SubscribeMessage('message')
    async handleNewMessage(@ConnectedSocket() client: Socket, @MessageBody() messageDto: MessageDto) {
        // create new message in mongo db
        // broadcast & return that message object

        try {
            const newMessage = new this.messageModel({
                ...messageDto,
            });
            await newMessage.save();

            console.log('saved message', newMessage);
            client.broadcast.emit('message', newMessage);
            return newMessage;
        } catch (err) {
            throw new InternalServerErrorException();
        }
    }
}
