import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { CreateProfileDto } from '@/user/dtos/create-profile.dto';
import { Profile } from '@/user/entities/profile.entity';
import { ProfilesService } from '@/user/profiles/profiles.service';
import {Controller, Get, Req, Post, Body, Param} from '@nestjs/common';
import {UseGuards} from '@nestjs/common/decorators';
import { Request } from 'express';

@Controller('profiles')
export class ProfilesController {
    constructor (
        private readonly profilesService : ProfilesService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('my')
    async getMine(@Req() req: Request) : Promise<Profile | undefined> {
        const uid = req.user.uid;
        
        console.log("### profilesController getMine request received");
        console.log('req.user: ', req.user);
        return await this.profilesService.findOneByUid(uid);

        //return this.profilesService.findOneByUid();
    }

    @Get(':uid')
    @Get()
    async getOne(@Param('uid') uid: number) {
        console.log("### profilesController getOne request received");
        return await this.profilesService.findOneByUid(uid);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Req() req: Request, @Body() profileData: CreateProfileDto) : Promise<number | void> {
        const uid = req.user.uid;

        console.log("### profilesController create request received");
        console.log('req.user: ', req.user);

        return await this.profilesService.create(uid, profileData);
    }


}