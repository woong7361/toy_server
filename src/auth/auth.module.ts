import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { FindModule } from 'src/find/find.module';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports:[
    ConfigModule.forRoot(),                                                     //수정 요망
    MongooseModule.forFeature([{name:User.name,schema:UserSchema}]),
    PassportModule,
    JwtModule.register({                                                        //jwt 설정
      secret:process.env.JWT_SECRET,
      signOptions: {expiresIn: process.env.JWT_EXPIRATION_TIME + 's'}
    }),
    FindModule
  ], 
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
  exports:[
    AuthService,
  ]
})
export class AuthModule {}
