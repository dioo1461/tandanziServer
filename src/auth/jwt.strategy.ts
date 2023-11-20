import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '@/secrets/constants';
import { AuthService } from '@/auth/auth.service';
import { UsersService } from '@/user/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Authorization: bearer ${token} 표준방식 사용
      ignoreExpiration: false, // 만료시 401 에러 응답
      secretOrKey: jwtConstants.secret, // pem의 encoded public key를 권장
    });
  }

  async validate(payload: any) {
    try {
      console.log('jwt.strategy.validate(), received payload: ', payload);
      const user = await this.usersService.findOneByEmail(payload.email);
      if (user) {
        console.log('jwt.strategy.validate() user found, user.email: ', user.email);
        return user;
      }
      console.log('jwt.strategy.validate() user not found');
      return null;
    }
    catch (err) {
      throw err;
    }
  }
}