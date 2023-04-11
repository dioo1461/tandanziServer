import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '@/auth/constants';
import { AuthService } from '@/auth/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Authorization: bearer ${token} 표준방식 사용
      ignoreExpiration: false, // 만료시 401 에러 응답
      secretOrKey: jwtConstants.secret, // pem의 encoded public key를 권장
    });
  }

  async validate(payload: any) {
    try{
      const user = await this.authService.validateUser
    }
    return { email: payload.email, uid: payload.sub };
  }
}