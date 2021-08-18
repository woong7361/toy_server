import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
      @InjectModel(User.name) private readonly userModel:Model<UserDocument>,
    ){
    super({                                                                       //jwt-strategy option으로 header에서 token추출
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any):Promise<any> {                                   //encodeing한 결과가 validate method의 payload로 들어온다
      const userId = payload.sub;
      let user;
      try{
        user = await this.userModel.findById(userId);    //password 빼내기
      }catch(error){
        throw new HttpException(error, 400);
      }
    return user;    //return 한 내용이 req.user로 저장된다.
  }
}