import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseEntity, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.userRepository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private users: Repository<User>,
    ) {}


}
