import { Module } from "@nestjs/common";
import { UsersModule } from "src/user/users.module";
import { AuthService } from "./auth.service";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from "./constants";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";
import { Repository } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '2h'},
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy,],
    exports: [AuthService],
})
export class AuthModule {}

