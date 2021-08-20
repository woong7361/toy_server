import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { Model } from 'mongoose';
import { FindService } from 'src/find/find.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
      @InjectModel(User.name) private readonly userModel:Model<UserDocument>,
      private readonly findService: FindService,
    ){
    super({                                                                       //여기에서 jwt를 추출한 후 자동으로 decode한 후 비교까지 수행해 준다.
      jwtFromRequest: ExtractJwt.fromExtractors([                                 //request를 받아 쿠키에서 Authorization 항목을 추출 후 return 
        (request) => {
          return request?.cookies?.Authorization;
        },
      ]),
      ignoreExpiration: false,                                                    
      secretOrKey: process.env.JWT_SECRET,                                        //jwt decoding용 secretKey
    });
  }

  async validate(payload: any):Promise<any> {                                     //encodeing한 결과가 validate method의 payload로 들어온다
    const userId = payload.sub;
    const user = await this.findService.findUserById(userId);
    return user;                                                                 //return 한 내용이 req.user로 저장된다.
  }
}