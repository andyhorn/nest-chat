import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('api/v1/users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    public getAllUsers(): Promise<User[]> {
        return this.usersService.getAll();
    }

    @Post()
    public createUser(@Body() user: User): Promise<User> {
        return this.usersService.create(user);
    }
}
