import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Post,
    Req,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInUserDto } from './dto/log-in-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/log_in')
    async logIn(@Body() logInDto: LogInUserDto) {
        return this.authService.logIn(logInDto);
    }

    @Post('/reg')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @Get('/me')
    async init(@Req() req: Request) {
        if (req['user']) {
            return req['user'];
        }
        throw new UnauthorizedException();
    }
}
