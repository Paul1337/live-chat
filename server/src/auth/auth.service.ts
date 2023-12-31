import {
    BadRequestException,
    ForbiddenException,
    HttpException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LogInUserDto } from './dto/log-in-user.dto';
import { UserPayloadScheme } from './model/request.model';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService
    ) {}

    async logIn(loginUserDto: LogInUserDto) {
        const user = await this.usersService.findOne({
            username: loginUserDto.username,
        });
        if (!user) throw new ForbiddenException(`User with username '${loginUserDto.username}' not found`);

        const passwordHash = user.password;
        if (!bcrypt.compareSync(loginUserDto.password, passwordHash)) {
            throw new ForbiddenException('Password is not correct');
        }

        console.log('pass ok');

        const payload: UserPayloadScheme = {
            email: user.email,
            username: user.username,
            id: user._id.toString(),
        };
        return {
            authToken: await this.jwtService.signAsync(payload),
            userData: payload,
        };
    }

    async register(createUserDto: CreateUserDto) {
        const userWithSameUsername = await this.usersService.findOne({
            username: createUserDto.username,
        });
        if (userWithSameUsername)
            throw new HttpException(`User with username ${createUserDto.username} already exists`, 500);
        createUserDto.password = bcrypt.hashSync(createUserDto.password, 5);
        try {
            await this.usersService.createOne(createUserDto);
        } catch (err) {
            throw new BadRequestException([
                'Check your email and username, they must be unique across all accounts',
            ]);
        }
        return {
            message: 'ok',
        };
    }

    extractAuthTokenFromHeader(authHeader: string): string | undefined {
        const [type, token] = authHeader?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    async verifyToken(token: string): Promise<UserPayloadScheme> {
        try {
            const payload = await this.jwtService.verifyAsync(token);
            return payload;
        } catch (err) {
            console.log(err);
            throw new UnauthorizedException();
        }
    }
}
