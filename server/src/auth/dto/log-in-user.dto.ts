import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LogInUserDto {
    @IsNotEmpty()
    username?: string;

    @IsEmail()
    @Length(4)
    email?: string;

    @IsNotEmpty()
    @Length(3)
    password: string;
}
