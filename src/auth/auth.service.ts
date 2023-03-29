import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user/entities/user.entity";
import { ComparePassword } from "./bcrypt-password";

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
                email : email,
            }
        })
        // 여기서부터 수정된 코드
        if (user) {
            ComparePassword(user.password, pass)
            .then(res=>{
                if (res) {
                    const { password, ...result } = user;
                    return result;
                }
            })
            .catch(err=>{});
            return null;
        }

        // if (user && user.password === pass) {
            
        //     const { password, ...result } = user;
        //     return result;
        // }
        // return null;
    }

    async login(user: any) {
        console.log(user);
        const payload = {email: user.email, sub: user.uid};
        console.log(this.jwtService.sign(payload));
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
