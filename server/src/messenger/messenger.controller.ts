import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { RequestExtended } from 'src/auth/model/request.model';
import { MessengerService } from './messenger.service';
import { CreateGroupChatDto, CreatePrivateChatDto } from './dto/create-chat.dto';

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

    @Post('chats/createPrivate')
    createPrivateChat(@Req() req: RequestExtended, @Body() body: CreatePrivateChatDto) {
        const user = req.user;
        return this.messengerService.createPrivateChat(user.id, body);
    }

    @Post('chats/createGroup')
    createGroupChat(@Req() req: RequestExtended, @Body() body: CreateGroupChatDto) {
        const user = req.user;
        // return this.messengerService.createGroupChat(user.id, body);
    }
}
