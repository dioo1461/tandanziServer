import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

    findOne(uid: number): Promise<User | undefined> {
        return this.usersRepository.findOne({
            where: {
                uid: uid
            }
        });
    }

    async create(user:CreateUserDto) {
        await this.usersRepository.create(user);
    }

    async remove(uid:number) {
        await this.usersRepository.delete({uid:uid});
    }
    // async findOne(username: string): Promise<User | undefined> {
    //     return this.users.find(user => user.username === username);
    // }
}
