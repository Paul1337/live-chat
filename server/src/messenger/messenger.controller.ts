import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { RequestExtended } from 'src/auth/model/request.model';
import { MessengerService } from './messenger.service';
import { CreateGroupChatDto, CreatePrivateChatDto } from './dto/create-chat.dto';
import { VerifyUserChatGuard } from './guards/verify-user-chat.guard';

@Controller('messenger')
export class MessengerController {
    constructor(private readonly messengerService: MessengerService) {}

    @Get('chats')
    getUserChats(@Req() req: RequestExtended) {
        return this.messengerService.getUserChats(req.user.id);
    }

    @Get('chats/:id')
    @UseGuards(VerifyUserChatGuard)
    async getChatMessages(@Req() req: RequestExtended, @Param('id') id: string) {
        return this.messengerService.getChatMessages(req.user.id, id);
    }

    @Post('chats/createPrivate')
    createPrivateChat(@Req() req: RequestExtended, @Body() body: CreatePrivateChatDto) {
        return this.messengerService.createPrivateChat(req.user.id, body);
    }

    @Post('chats/createGroup')
    createGroupChat(@Req() req: RequestExtended, @Body() body: CreateGroupChatDto) {
        const user = req.user;
        // return this.messengerService.createGroupChat(user.id, body);
    }

    @Post('chats/:id/read')
    @UseGuards(VerifyUserChatGuard)
    readChat(@Req() req: RequestExtended, @Param('id') id: string) {
        return this.messengerService.readChatMessages(req.user.id, id);
    }
}
