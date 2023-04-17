import { CreateProfileDto } from '@/user/dtos/create-profile.dto';
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
            console.log('profiles.service.findOneByUid return profile: ', profile);
            return profile;
        }
        return null;
    }


    async create(uid: number, profile: CreateProfileDto): Promise<number | void> {
        this.profileRepository.save({uid, ...profile})
        .then(res => {
            return uid;
        })
        .catch(err => {
            throw err;
        })
    }
}
