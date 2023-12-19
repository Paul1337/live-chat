import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { FindUserDto } from './dto/find-user-dto';
import { CreateUserDto } from './dto/create-user.dto';

export type FindAllResponse = Array<{
    username: string;
}>;

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findAll(): Promise<FindAllResponse> {
        return this.userModel
            .find(
                {},
                {
                    username: true,
                },
            )
            .exec();
    }

    async findOne(findUserDto: FindUserDto): Promise<User> {
        const user = await this.userModel
            .findOne<UserDocument>({
                username: findUserDto.username,
            })
            .exec();
        return user;
    }

    async createOne(createUserDto: CreateUserDto): Promise<User> {
        const newUser = new this.userModel(createUserDto);
        await newUser.save();
        return newUser;
    }
}
