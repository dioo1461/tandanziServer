import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '@/auth/auth.service';
import { EncryptPassword } from '@/common/utils/bcrypt-password';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@/user/dtos/create-user.dto';
import { User } from '@/user/entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private authService: AuthService,
    ) { }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOneByEmail(email: string): Promise<{ uid: number, email: string, username: string } | undefined> {
        const user = await this.usersRepository.findOne({
            where: {
                email: email,
            }
        });
        if (user) {
            const { password, ...rest } = user;
            return rest;
        }
        return null;
    }

    async findOneByUsername(username: string): Promise<{ uid: number, email: string, username: string } | undefined> {
        const user = await this.usersRepository.findOne({
            where: {
                username: username,
            }
        });
        if (user) {
            const { password, ...rest } = user;
            return rest;
        }
        return null;
    }


    async create(user: CreateUserDto): Promise<boolean | void> {
        const { password: pass, ...rest } = user;
        return await EncryptPassword(pass)
            .then(res => {
                const crypted = res;
                const newUser = {
                    password: crypted,
                    ...rest
                }
                return this.usersRepository.save(newUser);
            })
            .then(() => {
                console.log('user.service.create(), return true');
                return true;
            })
            .catch((err) => {
                throw err;
            });
    }

    async updateOneByEmail(email: string, user: {email?: string, username?: string, password?: string}): Promise<boolean | void> {
        let data = user; // user가 객체일 경우, 참조에 의한 전달을 하기 때문에 side effect를 방지하기 위해 let으로 새로 변수 생성
        if (data.password) {
            const { password: pass, ...rest } = data;
            data = await EncryptPassword(pass)
            .then(res => {
                console.log('users.service.updateOneByEmail() password encryption successed');
                const crypted = res;
                return {
                    password: crypted,
                    ...rest
                }
            })
            .catch((err) => {
                console.log('users.service.updateOneByEmail() password encryption failed');
                throw err;
            });
        }
        await this.usersRepository.update({email: email}, data);
    }

    async removeOneByEmail(email: string) {
        await this.usersRepository.delete({ email: email });
    }
    // async findOne(username: string): Promise<User | undefined> {
    //     return this.users.find(user => user.username === username);
    // }
}
