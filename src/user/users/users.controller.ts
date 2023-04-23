import { Body, Controller, Get, Param, Post, Delete, Query, Req, Patch } from '@nestjs/common';
import { CreateUserDto } from '@/user/dtos/create-user.dto';
import { UsersService } from '@/user/users/users.service';
import { User } from '@/user/entities/user.entity';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) { }
    
    @Get()
    async getOne(@Query('email') email: string, @Query('username') username: string): Promise<Object | undefined> {
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

    @Get('/my')
    @UseGuards(JwtAuthGuard)
    async getOneByJwt(@Req() req: Request) : Promise<Object | undefined> {
        console.log('### usercontroller jwt get request received');
        console.log('req.user: ', req.user);
        return this.usersService.findOneByEmail(req.user.email);
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

    @Patch()
    @UseGuards(JwtAuthGuard)
    updateOne(@Req() req: Request, @Body() data: {email?: string, username?: string, password?: string}){
        console.log("### user Auth update request received");
        return this.usersService.updateOneByEmail(req.user.email, data);
    }


    // 추후 보안 강화
    @Delete()
    @UseGuards(JwtAuthGuard)
    removeOne(@Req() req: Request) {
        console.log("### user delete request received");
        return this.usersService.removeOneByEmail(req.user.email);
    }

}
