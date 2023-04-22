import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "@/user/entities/user.entity";
import { comparePassword } from "@/common/utils/bcrypt-password";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    // private readonly secretkey = 'mykey';

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userRepository.findOne({
            where: {
                email: email,
            }
        });
        // 여기서부터 수정된 코드
        console.log('auth.service.validateUser(), user:', user);
        console.log('auth.service.validateUser(), email & pw:', email, pass);
        if (user) {
            const res = await comparePassword(pass, user.password);
            console.log('auth.service.validateUser().ComparePassword().then, res:', res);
            if (res) {
                const { password, ...rest } = user;
                console.log('auth.service.validateUser().res=true, return rest:', rest);
                return rest;
            } else {
                console.log('auth.service.validateUser().res=true, return null');
                return null;
            }
        };
    }

    async issueJwt(user: any) {
        console.log('auth.service.issueJwt(), user:', user);
        const payload = {email: user.email, sub: user.uid};
        console.log('auth.service.issueJwt(), return payload:', this.jwtService.sign(payload));
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async decodeJwt(token: string) {
        console.log('auth.service.decodeJwt(), token:', token);
        const decoded = this.jwtService.decode(token);
        if (decoded) {
            return decoded;
        }
        return null;
    }

    async comparePassword(email: string, password: string) {
        console.log('auth.service.comparePassword()');
        const user = await this.userRepository.findOne({
            where: {
                email: email
            }
        });

        if (!user) {
            console.log('auth.service.comparePassword(): user is undefined');
            return false;
        }
        const origin = user.password;
        console.log('pass: ', password, 'origin: ', origin);
        const res = await comparePassword(password, origin);
        console.log('comparePassword() res:', res);
        return res;
    }
}
