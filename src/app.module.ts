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
    entities : [User],
    synchronize : true,
  }),
  AuthModule,
  UsersModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
