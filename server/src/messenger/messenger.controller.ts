import { Controller, Get } from '@nestjs/common';
import { MessengerService } from './messenger.service';

@Controller('messenger')
export class MessengerController {
    constructor(private readonly messengerService: MessengerService) {}

    @Get('chats')
    getUserChats() {}

    @Get('chats/:chat-id')
    getChatMessages() {}
}
