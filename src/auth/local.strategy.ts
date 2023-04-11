import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport/dist";
import { Strategy as LocalPassportStrategy } from 'passport-local';
import { AuthService } from "@/auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(LocalPassportStrategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'email' }); // 401 에러 해결
    }

    async validate(email: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(email, password);
        console.log('local-strategy.user:', user);
        if (!user) {
            // console.log('local.strategy-unauthorizedException');
            throw new UnauthorizedException();
        }
        // console.log('local.strategy-return user')
        return user;
    }
}