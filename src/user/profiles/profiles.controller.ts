import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { Profile } from '@/user/entities/profile.entity';
import { ProfilesService } from '@/user/profiles/profiles.service';
import {Controller, Get, Req} from '@nestjs/common';
import {UseGuards} from '@nestjs/common/decorators';
import { Request } from 'express';

@Controller('profiles')
export class ProfilesController {
    constructor (
        private readonly profilesService : ProfilesService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getOne(@Req() req: Request) : Promise<Profile | undefined> {
        const user = req.user.uid;

        

        console.log("### profilesController get request received");
        return this.profilesService.findOneByUid(uid);     
    }

}