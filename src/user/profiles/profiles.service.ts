import { Profile } from '@/user/entities/profile.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class ProfilesService {
    constructor(
        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>,
    ) { }

    async findOneByUid(uid: number): Promise<Profile | undefined> {
        const profile = await this.profileRepository.findOne({
            where: {
                uid: uid,
            }
        });
        if (profile) {
            return profile;
        }
        return null;
    }

}
