import { AuthModule } from '@/auth/auth.module';
import { JwtStrategy } from '@/auth/jwt.strategy';
import { Profile } from '@/user/entities/profile.entity';
import { ProfilesController } from '@/user/profiles/profiles.controller';
import { ProfilesService } from '@/user/profiles/profiles.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    imports:[
        TypeOrmModule.forFeature([Profile]),
        AuthModule,
    ],
    controllers:[ProfilesController],
    providers: [ProfilesService],
})
export class ProfilesModule { }