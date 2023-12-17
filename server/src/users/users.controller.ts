import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller({
    path: '/users',
})
export class UsersController {
    public constructor(private userService: UsersService) {}

    @Get('/')
    findAll() {
        return this.userService.findAll();
    }
}
