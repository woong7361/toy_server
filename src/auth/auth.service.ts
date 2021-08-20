import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schema/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { FindService } from 'src/find/find.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService,
        private readonly findService: FindService,
    ){}

    async validateUser(email:string, password:string):Promise<any> {
        const user = await this.findService.findUserByEmail(email);
        const isPasswordSame = await bcrypt.compare(password, user.password)
        
        if( user && isPasswordSame){                                    
            const {_id}= user;
            return {_id};                       //req.user에 _id넣어준다
        }
        return null;
    }

    login(user: any) {
        const payload = { sub: user._id };                  //jwt payload구성

        return {                                            //jwtToken과 cookie option을 반환
            jwtToken: this.jwtService.sign(payload),
            path: '/',
            httpOnly: true,
            maxage: Number(process.env.JWT_EXPIRATION_TIME)*1000
        }
    }

    logout() {                                        //쿠키를 비워보냄
        return {
            jwtToken: '',
            path: '/',
            httpOnly: true,
            maxAge: 0,
          };
    }
}
