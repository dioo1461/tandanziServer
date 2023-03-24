import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    getOne(@Param() uid:number) : Promise<User> {
        return this.userService.findOne(uid);
    }

    @Post()
    create(@Body() userData: CreateUserDto) {
        return this.userService.create(userData);
    }

    @Delete()
    removeOne(@Param() uid:number) {
        return this.userService.remove(uid);
    }

    

}
