import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

        @Get()
        findAll() : Promise<User[]> {
            return this.userService.findAll();
        }

        @Post()
        async create(@Body() userData: CreateUserDto) : Promise<User> {
            return await this.userService.create(userData);
        }
    

}
