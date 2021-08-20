import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoException } from 'src/common/exception/mongo.exception';
import { User, UserDocument } from 'src/users/schema/user.schema';

@Injectable()
export class FindService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>){}
    private logger = new Logger('MONGO');

    async findUserByEmail(email):Promise<User> {
        try{
            const user = await this.userModel.findOne({email});
            return user;
        }catch(error){
            this.logger.log(error);
            throw new MongoException(error);
        }
    }

    async findUserById(id): Promise<User> {
        try{
            const user = await this.userModel.findById(id);
            return user;
        }catch(error){
            this.logger.log(error);
            throw new MongoException(error);
        }
    }

    async isUserExistByEmail(email): Promise<boolean> {
        try{
            const user = await this.userModel.exists({email});
            return user;
        }catch(error){
            this.logger.log(error);
            throw new MongoException(error);
        }
    }


}
