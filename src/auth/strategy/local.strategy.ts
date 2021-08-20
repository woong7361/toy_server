import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {   //passport-local 의 Strategy
  constructor(private authService: AuthService) {
    super({ usernameField: 'email'});                             //default username, password => email, password 로 변경
  }

  async validate(email: string, password: string): Promise<any> {         //passport-local 이 불렸을 때 자동실행 메서드 1번
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new HttpException('인증오류 please check your email or password',401);
    }
    return user;
  }
}