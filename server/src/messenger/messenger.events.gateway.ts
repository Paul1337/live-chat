import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { EditMessageDto } from './dto/edit-message.dto';
import { MessageDto } from './dto/message.dto';
import { ReadMessageDto } from './dto/read-message.dto';
import { RemoveMessageDto } from './dto/remove-message.dto';
import { MessengerService } from './services/messenger.service';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private messengerService: MessengerService) {}

    async handleConnection(@ConnectedSocket() client: Socket) {
        await this.messengerService.connectSocket(client);
    }

    async handleDisconnect(@ConnectedSocket() client: Socket) {
        await this.messengerService.disconnectSocket(client);
    }

    @SubscribeMessage('edit-message')
    async editMessage(@MessageBody() editMessageDto: EditMessageDto, @ConnectedSocket() client: Socket) {
        await this.messengerService.editMessage(editMessageDto, client);
    }

    @SubscribeMessage('remove-message')
    async removeMessage(@MessageBody() removeMessageDto: RemoveMessageDto, @ConnectedSocket() client: Socket) {
        await this.messengerService.removeMessage(removeMessageDto, client);
    }

    @SubscribeMessage('read')
    async readChat(@MessageBody() readMessageDto: ReadMessageDto, @ConnectedSocket() client: Socket) {
        await this.messengerService.readChatMessages(readMessageDto, client);
    }

    @SubscribeMessage('message')
    async handleNewMessage(@MessageBody() messageDto: MessageDto, @ConnectedSocket() client: Socket) {
        return this.messengerService.sendMessage(messageDto, client);
    }
}
