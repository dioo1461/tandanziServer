import { Controller, Get, Post, Req, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { AuthService } from '@/auth/auth.service'; 
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'; 
import { LocalAuthGuard } from '@/auth/local-auth.guard'; 
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/login')
    @UseGuards(LocalAuthGuard)
    async login(@Req() req: Request) {
        console.log('### auth.controller : login request received');
        // console.log('app.controller, req: ', req);
        return this.authService.issueJwt(req.user);
    }

    @Post('/check-password')
    @UseGuards(JwtAuthGuard)
    async checkPassword(@Req() req: Request, @Body() body: {password}) {
        console.log('### auth.controller : check-password request received, body: ', body);
        
        return await this.authService.comparePassword(req.user.email, body.password);
    }

}