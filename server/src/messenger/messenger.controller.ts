import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { RequestExtended } from 'src/auth/model/request.model';
import { MessengerService } from './messenger.service';

interface CreateChatBody {
    username: string;
}
@Controller('messenger')
export class MessengerController {
    constructor(private readonly messengerService: MessengerService) {}

    @Get('chats')
    getUserChats(@Req() req: RequestExtended) {
        const user = req.user;
        return this.messengerService.getUserChats(user.id);
    }

    @Get('chats/:id')
    getChatMessages(@Req() req: RequestExtended, @Param('id') id: string) {
        const user = req.user;
        return this.messengerService.getChatMessages(user.id, id);
    }

    @Post('chats/:id')
    createChat(@Req() req: RequestExtended, @Body() body: CreateChatBody) {
        const user = req.user;
        // return this.messengerService.createChat(user.id);
    }
}
