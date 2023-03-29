import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        ) {}

    @Get()
    getAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':email')
    getOne(@Param() email:string) : Promise<User> {
        return this.usersService.findOneByEmail(email);
    }



    @Post()
    create(@Body() userData: CreateUserDto) {
        if (this.usersService.findOneByEmail(userData.email)) {
            return null;
        }
        this.usersService.create(userData);
    }

    @Delete()
    removeOne(@Param() uid:number) {
        return this.usersService.remove(uid);
    }

    

}
