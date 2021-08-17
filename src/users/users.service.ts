import { HttpException, Injectable, Logger, UseFilters } from '@nestjs/common';
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
  private logger = new Logger('User');

  /*
  계정생성
  */
  async createAccount(createUserData: CreateUserDto) {
    const {email,name,password} = createUserData;
    let exist;

    try{
      exist = await this.userModel.exists({email:email})
    }catch(error){
      this.logger.log(error);
      throw new HttpException('mongo error', 400);                                                 
    }

    if(exist){
      throw new HttpException('this email is exist please another email', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    try{
      const newUser = await this.userModel.create(
        {email,
         name,
         password:hashedPassword
        }
      );
      return newUser;                                         
    }catch(error){
      this.logger.log(error);
      throw new HttpException('mongo error', 400);
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
      this.logger.log(error);
      throw new HttpException('mongo error', 400);
    }
  }

  /*
    email로 회원 찾기
  */
  async findByEmail(emailData:RequestEmail) {
    const{email} = emailData;
    let user;

    try{
      user = await this.userModel.findOne({email});  
    }catch(error){
      this.logger.log(error);
      throw new HttpException('mongo error', 400);
    }

    if(!user) throw new HttpException('this email is not exist', 400);
    else return user
  }

  /*
  email로 회원 삭제하기
  */
  async deleteAccount(emailData:RequestEmail){                    
    const{email} = emailData;
    let user

    try{
      user = await this.userModel.findOneAndDelete({email})                   //user 가 존재하지 않을 때 code 줄이기?
    }catch(error){
      this.logger.log(error);
      throw new HttpException('mongo error', 400);
    }

    if(!user) throw new HttpException('this email is not exist', 400);
    else return user
  }


    update(id: number, updateUserDto: UpdateUserDto) {
      return `This action updates a #${id} user`;
    }

    login(id: number) {
      // const isMatch = await bcrypt.compare(password, hash);
      return `This action removes a #${id} user`;
    }
}
