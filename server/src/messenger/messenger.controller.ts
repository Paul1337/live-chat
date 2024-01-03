import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { RequestExtended } from 'src/auth/model/request.model';
import { CreateGroupChatDto, CreatePrivateChatDto } from './dto/create-chat.dto';
import { VerifyUserChatGuard } from './guards/verify-user-chat.guard';
import { ChatService } from './services/chat.service';
import { MessageService } from './services/message.service';

@Controller('messenger')
export class MessengerController {
    constructor(
        private readonly messageService: MessageService,
        private readonly chatsService: ChatService
    ) {}

    @Get('chats')
    async getUserChats(@Req() req: RequestExtended) {
        return this.chatsService.getUserChatsWithDetailedData(req.user.id);
    }

    @Get('chats/:id')
    @UseGuards(VerifyUserChatGuard)
    async getChatMessages(@Req() req: RequestExtended, @Param('id') chatId: string) {
        return this.messageService.getChatMessages(chatId);
    }

    @Post('chats/createPrivate')
    createPrivateChat(@Req() req: RequestExtended, @Body() body: CreatePrivateChatDto) {
        return this.chatsService.createPrivateChat(req.user.id, body);
    }

    @Post('chats/createGroup')
    createGroupChat(@Req() req: RequestExtended, @Body() body: CreateGroupChatDto) {
        const user = req.user;
        // return this.messengerService.createGroupChat(user.id, body);
    }

    @Post('chats/:id/read')
    @UseGuards(VerifyUserChatGuard)
    readChat(@Req() req: RequestExtended, @Param('id') chatId: string) {
        return this.chatsService.readChatMessages(req.user.id, chatId);
    }
}
