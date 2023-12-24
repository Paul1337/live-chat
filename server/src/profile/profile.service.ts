import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProfileService {
    constructor(private usersService: UsersService) {}
}
