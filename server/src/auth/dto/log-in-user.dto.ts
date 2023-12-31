import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class LogInUserDto {
    @IsNotEmpty()
    username: string;

    // @IsEmail()
    // @Length(4)
    // @IsOptional()
    // email?: string;

    @IsNotEmpty()
    @Length(3)
    password: string;
}
