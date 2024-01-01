import { ForbiddenException, InternalServerErrorException } from '@nestjs/common';
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
import { RemoveMessageDto } from './dto/remove-message.dto';
import { EditMessageDto } from './dto/edit-message.dto';
import { MessagesService } from './messages.service';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
// @UseGuards(AuthWSGuard)
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    clients: Map<string, Socket>;
    tokendToIdMap: Map<string, string>;

    constructor(
        private authService: AuthService,
        private usersService: UsersService,
        private messengerService: MessengerService,
        private messengerRepository: MessengerRepository,
        private messagesService: MessagesService
    ) {
        this.clients = new Map();
        this.tokendToIdMap = new Map();
    }

    async handleConnection(@ConnectedSocket() client: Socket) {
        const token = client.handshake.auth.token;
        const payload = await this.authService.verifyToken(token);
        this.clients.set(payload.id, client);
        this.tokendToIdMap.set(token, payload.id);
        console.log('connected');
    }

    async handleDisconnect(@ConnectedSocket() client: Socket) {
        console.log('disconnected');
        const token = client.handshake.auth.token;
        const userId = this.tokendToIdMap.get(token);
        this.clients.delete(userId);
        this.tokendToIdMap.delete(token);
    }

    @SubscribeMessage('editMessage')
    async editMessage(@MessageBody() editMessageDto: EditMessageDto, @ConnectedSocket() client: Socket) {
        const token = client.handshake.auth.token;
        const userId = this.tokendToIdMap.get(token);
        if (!userId) throw new ForbiddenException('Unknown socket tries to edit message');
        const success = await this.messagesService.tryEditMessage(userId, editMessageDto);
        if (success) {
            // for (const user of chat.users) {
            //     if (user.toString() === userId) continue;
            //     const rightClient = this.clients.get(user.toString());
            //     if (rightClient) {
            //         rightClient.emit('editedMessage', newMessage);
            //     }
            // }
        }
    }

    @SubscribeMessage('removeMessage')
    async removeMessage(@MessageBody() removeMessageDto: RemoveMessageDto, @ConnectedSocket() client: Socket) {
        const token = client.handshake.auth.token;
        const userId = this.tokendToIdMap.get(token);
        if (!userId) throw new ForbiddenException('Unknown socket tries to remove message');
    }

    @SubscribeMessage('read')
    async readMessages(@MessageBody() readMessageDto: ReadMessageDto, @ConnectedSocket() client: Socket) {
        const { chatId, userId } = readMessageDto;
        console.log('Handle read event', chatId, userId);

        const token = client.handshake.auth.token;
        if (this.tokendToIdMap.get(token) !== userId) {
            throw new ForbiddenException('User id does not match the id of connected user!');
        }

        const hasChatAccess = await this.messengerRepository.verifyUserHasChat(
            new Types.ObjectId(userId),
            new Types.ObjectId(chatId)
        );
        if (!hasChatAccess) {
            throw new ForbiddenException('User does not have access to this chat!');
        }

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
        console.log('Handle message event', messageDto);

        const userId = messageDto.owner;
        const token = client.handshake.auth.token;
        if (this.tokendToIdMap.get(token) !== userId) {
            throw new ForbiddenException('Owner id does not match the id of connected user!');
        }

        const hasChatAccess = await this.messengerRepository.verifyUserHasChat(
            new Types.ObjectId(userId),
            new Types.ObjectId(messageDto.chatId)
        );
        if (!hasChatAccess) {
            throw new ForbiddenException('User does not have access to this chat!');
        }

        const user = await this.usersService.findOne({ _id: userId });
        if (!user) throw new InternalServerErrorException('Message owner user is not found!');

        const newMessage = await this.messengerRepository.createMessage(
            {
                chatId: new Types.ObjectId(messageDto.chatId),
                img: messageDto.img,
                text: messageDto.text,
            },
            user
        );

        console.log('saved message', newMessage);
        const chat = await this.messengerService.markNewMessageInChat(messageDto.chatId, userId);

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
