import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LogInUserDto } from './dto/log-in-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'bcrypt';
import { User } from 'src/users/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
    ) {}

    async logIn(loginUserDto: LogInUserDto) {
        const user = await this.usersService.findOne({
            email: loginUserDto.email,
            username: loginUserDto.username,
        });
        if (!user) throw new ForbiddenException();

        const passwordHash = user.password;
        if (!bcrypt.compareSync(loginUserDto.password, passwordHash)) {
            throw new ForbiddenException();
        }

        const payload = user;
        return {
            authToken: await this.jwtService.signAsync(payload),
            userData: payload,
        };
    }

    async register(createUserDto: CreateUserDto) {
        const userWithSameEmail = await this.usersService.findOne({
            email: createUserDto.email,
        });
        if (userWithSameEmail)
            throw new HttpException(`User with email ${createUserDto.email} already exists`, 500);
        createUserDto.password = bcrypt.hashSync(createUserDto.password, 5);
        await this.usersService.createOne(createUserDto);
        return {
            message: 'ok',
        };
    }
}
