import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { AuthModule } from '@/auth/auth.module';
import { AuthService } from '@/auth/auth.service';
import { User } from '@/user/entities/user.entity';
import { UsersController } from '@/user/users/users.controller';
import { UsersModule } from '@/user/users/users.module';
import { ProfilesModule } from '@/user/profiles/profiles.module';
import { Profile } from '@/user/entities/profile.entity';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath:['src/config/database/.development.env'],
  }),
  TypeOrmModule.forRoot({
    type : 'mariadb',
    host : process.env.DB_HOST,
    port : parseInt(process.env.DB_PORT),
    username : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE,
    entities : [User, Profile], // db 테이블(엔티티) 추가되면 여기도 추가해주기
    synchronize : true,
  }),
  AuthModule,
  UsersModule,
  ProfilesModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
