import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseEntity, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    findOne(uid: number): Promise<User | undefined> {
        return this.userRepository.findOne({
            where: {
                uid: uid
            }
        });
    }

    async create(user:CreateUserDto) {
        await this.userRepository.create(user);
    }

    async remove(uid:number) {
        await this.userRepository.delete({uid:uid});
    }
    // async findOne(username: string): Promise<User | undefined> {
    //     return this.users.find(user => user.username === username);
    // }
}
