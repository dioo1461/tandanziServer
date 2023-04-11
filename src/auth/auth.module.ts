import { Module } from "@nestjs/common";
import { UsersModule } from "@/user/users/users.module";
import { AuthService } from "@/auth/auth.service";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from "@/auth/constants";
import { LocalStrategy } from "@/auth/local.strategy";
import { JwtStrategy } from "@/auth/jwt.strategy";
import { Repository } from "typeorm";
import { User } from "@/user/entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "@/auth/auth.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '2h'},
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy,],
    exports: [AuthService],
})
export class AuthModule {}

