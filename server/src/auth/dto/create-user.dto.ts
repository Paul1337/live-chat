import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @Length(4)
    email: string;

    @IsNotEmpty()
    @Length(3)
    password: string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;
}
