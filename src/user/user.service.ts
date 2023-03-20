import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseEntity, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';


@Injectable()
export class UserService extends BaseEntity {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: UserRepository
    )


}
