import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EncryptPassword } from 'src/bcrypt/bcrypt-password';
import { BaseEntity, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOneByEmail(email: string): Promise<User | undefined> {
        return this.usersRepository.findOne({
            where: {
                email: email
            }
        });
    }

    findOneByUsername(username: string): Promise<User | undefined> {
        return this.usersRepository.findOne({
            where: {
                username: username
            }
        });
    }
    
    async create(user:CreateUserDto) {
        const {password: pass, ...rest} = user;
        await EncryptPassword(pass)
        .then(res => {
            const crypted = res;
            const newUser = {
                password: crypted,
                ...rest
            }
            this.usersRepository.save(newUser);
        })
        

        
    }

    async remove(email:string) {
        await this.usersRepository.delete({email:email});
    }
    // async findOne(username: string): Promise<User | undefined> {
    //     return this.users.find(user => user.username === username);
    // }
}
