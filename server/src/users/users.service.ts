import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

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
                }
            )
            .exec();
    }

    async findOne(findUserDto: Record<string, any>) {
        const user = await this.userModel.findOne<UserDocument>(findUserDto).exec();
        return user;
    }

    async createOne(createUserDto: CreateUserDto): Promise<User> {
        const newUser = new this.userModel({
            email: createUserDto.email,
            username: createUserDto.username,
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            password: createUserDto.password,
        });
        await newUser.save();
        return newUser;
    }

    async saveUserProfileImage(userId: string, imageSrc: string) {
        const updateRes = await this.userModel.updateOne(
            {
                _id: new Types.ObjectId(userId),
            },
            {
                profileImg: imageSrc,
            }
        );
        console.log('upd res', updateRes);
    }
}
