import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/usermodule';

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
  UserModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
