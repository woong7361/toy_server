import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';
import * as bcrypt from "bcrypt"
import { RequestEmail } from './dto/email-request.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}

  /*
  계정생성
  */
  async createAccount(createUserData: CreateUserDto) {
    const {email,name,password} = createUserData;
    try{
      const exist = await this.userModel.exists({email:email})
      if(exist){
        return {"error":'email is exist please check your email'}   //update please => throw error?
      }
    }catch(error){
      return {"error":error};                                                  //update please
    }

    try{
      const hashedPassword = await bcrypt.hash(password, 5);

      const newUser = await this.userModel.create(
        {email,
         name,
         password:hashedPassword
        }
      );
      return newUser;                                         
    }catch(error){
      return {"error":error};
    }
  }

  /*
  회원 전체 리스트 확인
  */
  findAllUser() {
    try{
      const allUserList = this.userModel.find({});
      return allUserList;  //is json?
    }catch(error){
      return {"error":error};
    }
  }

  /*
    email로 회원 찾기
  */
  async findByEmail(emailData:RequestEmail) {
    const{email} = emailData;
    try{
      const user = await this.userModel.findOne({email});   
      return user;
    }catch(error){
      return {"error":error};
    }
  }

  /*
  email로 회원 삭제하기
  */
  async deleteAccount(emailData:RequestEmail){                    
    const{email} = emailData;
    try{
      const exist = await this.userModel.exists({email});
      if(!exist){
        return {"error": "this email is not exist please check your email"};
      }
    }catch(error){
      return {"error":error};
    }

    try{
      const user = await this.userModel.findOneAndDelete({email})
      return user;
    }catch(error){
      return {"error":error};
    }
  }

    update(id: number, updateUserDto: UpdateUserDto) {
      return `This action updates a #${id} user`;
    }

    login(id: number) {
      // const isMatch = await bcrypt.compare(password, hash);
      return `This action removes a #${id} user`;
    }
}
