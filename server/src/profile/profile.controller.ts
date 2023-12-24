import { Controller, Get, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { RequestExtended } from 'src/auth/model/request.model';
import { UsersService } from 'src/users/users.service';
import { Types } from 'mongoose';

@Controller('profile')
export class ProfileController {
    constructor(
        private readonly profileService: ProfileService,
        private usersService: UsersService,
    ) {}

    @Get('data')
    async getUserData(@Req() req: RequestExtended) {
        const userId = req.user.id;
        const user = await this.usersService.findOne({
            _id: new Types.ObjectId(userId),
        });
        return {
            profileImg: user.profileImg,
            firstName: user.firstName,
            lastName: user.lastName,
        };
    }

    @Post('uploadPhoto')
    @UseInterceptors(
        FileInterceptor('file', {
            dest: './static/uploads',
        }),
    )
    async uploadFile(@Req() req: RequestExtended, @UploadedFile() profileImg: Express.Multer.File) {
        console.log('uploaded file', profileImg);
        const correctedPath = profileImg.path.substring(profileImg.path.indexOf('/'));
        console.log('corrected image path', correctedPath);
        await this.usersService.saveUserProfileImage(req.user.id, correctedPath);
        return {
            profileImg: correctedPath,
        };
    }
}
