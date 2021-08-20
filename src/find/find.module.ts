import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { FindService } from './find.service';

@Module({
  imports:[
    MongooseModule.forFeature([{name:User.name,schema:UserSchema}])
  ],
  providers: [FindService],
  exports: [FindService]
})
export class FindModule {}
