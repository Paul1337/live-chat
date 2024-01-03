import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { MessageService } from './message.service';
import { ChatService } from './chat.service';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { ReadMessageDto } from '../dto/read-message.dto';
import { MessageDto } from '../dto/message.dto';
import { EditMessageDto } from '../dto/edit-message.dto';
import { RemoveMessageDto } from '../dto/remove-message.dto';
import { Types } from 'mongoose';
import { Chat } from '../schemas/chat.schema';

@Injectable()
export class MessengerService {
    clients: Map<string, Socket>;
    tokendToIdMap: Map<string, string>;

    constructor(
        private readonly messageService: MessageService,
        private readonly chatService: ChatService,
        private authService: AuthService,
        private usersService: UsersService
    ) {
        this.clients = new Map();
        this.tokendToIdMap = new Map();
    }

    async connectSocket(client: Socket) {
        const token = client.handshake.auth.token;
        const payload = await this.authService.verifyToken(token);
        this.clients.set(payload.id, client);
        this.tokendToIdMap.set(token, payload.id);
        console.log('connected');
    }

    async disconnectSocket(client: Socket) {
        const token = client.handshake.auth.token;
        const userId = this.tokendToIdMap.get(token);
        this.clients.delete(userId);
        this.tokendToIdMap.delete(token);
        console.log('disconnected');
    }

    async sendMessage(messageDto: MessageDto, client: Socket) {
        console.log('Handle message event', messageDto);

        const { owner: userId, chatId, img, text } = messageDto;

        await this.verifyUserToken(client, userId);
        await this.chatService.verifyUserHasChat(userId, chatId);

        const user = await this.usersService.findOne({ _id: userId });
        if (!user) throw new InternalServerErrorException('Message owner user is not found!');

        const newMessage = await this.messageService.createMessage(
            {
                chatId: new Types.ObjectId(chatId),
                img: img,
                text: text,
            },
            user
        );

        const chat = await this.chatService.markNewMessageInChat(chatId, userId);
        this.emitToChatMembers(chat, userId, 'message', newMessage);

        return newMessage;
    }

    async readChatMessages(readMessageDto: ReadMessageDto, client: Socket) {
        console.log('Handle read event', readMessageDto);

        const { chatId, userId } = readMessageDto;

        await this.verifyUserToken(client, userId);
        await this.chatService.verifyUserHasChat(userId, chatId);

        await this.chatService.readChatMessages(userId, chatId);
        const chat = await this.chatService.getChatById(chatId);

        this.emitToChatMembers(chat, userId, 'read', readMessageDto);
    }

    async editMessage(editMessageDto: EditMessageDto, client: Socket) {
        const userId = await this.getSocketUserId(client);
        const success = await this.messageService.tryEditMessage(userId, editMessageDto);
        if (!success) return;
        const chat = await this.chatService.getChatById(editMessageDto.chatId);
        this.emitToChatMembers(chat, userId, 'edit-message', editMessageDto);
    }

    async removeMessage(removeMessageDto: RemoveMessageDto, client: Socket) {
        const userId = await this.getSocketUserId(client);
        const success = await this.messageService.tryRemoveMessage(userId, removeMessageDto);
        if (!success) return;
        const chat = await this.chatService.getChatById(removeMessageDto.chatId);
        this.emitToChatMembers(chat, userId, 'remove-message', removeMessageDto);
    }

    async getSocketUserId(client: Socket) {
        const token = client.handshake.auth.token;
        const userId = this.tokendToIdMap.get(token);
        if (!userId) throw new ForbiddenException('Unknown socket');
        return userId;
    }

    async verifyUserToken(client: Socket, userId: string) {
        const token = client.handshake.auth.token;
        if (this.tokendToIdMap.get(token) !== userId) {
            throw new ForbiddenException('User id does not match the id of connected user!');
        }
    }

    emitToChatMembers(chat: Chat, fromId: string, message: string, data: any) {
        for (const user of chat.users) {
            if (user.toString() === fromId) continue;
            const client = this.clients.get(user.toString());
            if (client) {
                client.emit(message, data);
            }
        }
    }
}
