import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {   //passport-local 의 Strategy
  constructor(private authService: AuthService) {
    super({ usernameField: 'email'});
  }

  async validate(email: string, password: string): Promise<any> {         //passport-local 이 불렸을 때 자동실행 메서드 1번
    let user;
    try{
      user = await this.authService.validateUser(email, password);
    }catch(error){
      
      throw new HttpException(error, 400);    //mongo error?
    }

    if (!user) {
      throw new HttpException('인증오류 please check your email or password',401);
    }
    return user;
  }
}