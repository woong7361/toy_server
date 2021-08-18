import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schema/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService
    ){}

    async validateUser(email:string, password:string):Promise<any> {
        let user;
        try{
            user = await this.userModel.findOne({email});
        }catch(error){
            throw new HttpException(error,400);
        }
        
        if( user && bcrypt.compare(user.password, password)){                                    
            const {_id}= user;
            return {_id};                       //req.user에 _id넣어준다
        }
        return null;
    }

    async login(user: any) {
        const payload = { sub: user._id };                  //jwt payload구성
        return {
          access_token: this.jwtService.sign(payload),
        };
    }
}
