import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { AuthService } from '@/auth/auth.service'; 
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'; 
import { LocalAuthGuard } from '@/auth/local-auth.guard'; 

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
        console.log('### app.controller-auth/login request received');
        // console.log('app.controller, req: ', req);
        return this.authService.issueJwt(req.user);
    }

}