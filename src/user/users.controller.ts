import { Body, Controller, Get, Param, Post, Delete, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { QueryResult } from 'typeorm';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from '@nestjs/common/decorators';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    @Get()
    getOne(@Query('email') email: string, @Query('username') username: string): Promise<User | undefined> {
        console.log("### usercontroller email or username get request received");
        console.log('email:' , email, 'username:', username);
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
        console.log('### user getall request received');
        return this.usersService.findAll();
    }

    @Post()
    async create(@Body() userData: CreateUserDto) {
        console.log("### user create request received");
        return await this.usersService.findOneByEmail(userData.email)
        .then(res => {
            if (res) {
                console.log('### email already exists, creation failed');
                return false;
            } else {
                return this.usersService.create(userData);
            }
        })
        .then(()=>{
            console.log('### user created');
            return true;
        })
        .catch(err => {
            throw err;
        })
        
    }

    @Delete()
    removeOne(@Param() email: string) {
        console.log("### user delete request received");
        return this.usersService.remove(email);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

}
