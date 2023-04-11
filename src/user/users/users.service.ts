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

    async findOneByEmail(email: string): Promise<Object | undefined> {
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

    async findOneByUsername(username: string): Promise<Object | undefined> {
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


    async create(user: CreateUserDto) {
        const { password: pass, ...rest } = user;
        return await EncryptPassword(pass)
            .then(res => {
                const crypted = res;
                const newUser = {
                    password: crypted,
                    ...rest
                }
                return this.usersRepository.save(newUser)
            })
            .then(() => {
                console.log('user.service.create(), return true');
                return true;
            })
            .catch((err) => {
                throw err;
            });
    }

    async remove(email: string) {
        await this.usersRepository.delete({ email: email });
    }
    // async findOne(username: string): Promise<User | undefined> {
    //     return this.users.find(user => user.username === username);
    // }
}
