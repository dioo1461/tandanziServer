import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user/entities/user.entity";
import { ComparePassword } from "../bcrypt/bcrypt-password";

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
        // console.log('auth.service-user:', user);
        // console.log('auth.service-email & pw:', email, pass);
        if (user) {
            const res = await ComparePassword(pass, user.password);
            // console.log('auth.service-then');
            // console.log('auth.service-res:', res);
            if (res) {
                const { password, ...rest } = user;
                // console.log('auth.service-rest:', rest);
                return rest;
            } else {
                return null;
            }
        };
    }

    async login(user: any) {
        console.log('login-user:', user);
        const payload = {email: user.email, sub: user.uid};
        console.log('payload:', this.jwtService.sign(payload));
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
