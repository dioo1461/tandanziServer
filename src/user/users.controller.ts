import { Body, Controller, Get, Param, Post, Delete, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { QueryResult } from 'typeorm';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) { }


    @Get()
    getOne(@Query('email') email: string, @Query('username') username: string): Promise<User | undefined> {
        console.log("email or username get request received");
        console.log(email, username);
        if (email !== undefined && username !== undefined) {
            return this.usersService.findOneByEmail(email);
        }
        if (username === undefined) {
            return this.usersService.findOneByEmail(email);
        }
        if (email === undefined) {
            return this.usersService.findOneByUsername(username);
        }
    }

    

    @Get()
    getAll(): Promise<User[]> {
        console.log('getall request received');
        return this.usersService.findAll();
    }

    @Post()
    create(@Body() userData: CreateUserDto) {
        console.log("user create request received");
        this.usersService.findOneByEmail(userData.email)
        .then(res => {
            if (res) {
                console.log('email already exists');
                return false;
            } else {
                this.usersService.create(userData);
                console.log("user created");
                return true;
            }
        })
        .catch(err => {})
        
    }

    @Delete()
    removeOne(@Param() email: string) {
        console.log("user delete request received");
        return this.usersService.remove(email);
    }



}
