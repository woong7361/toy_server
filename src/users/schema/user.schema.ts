import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
    timestamps: true,
}

export type UserDocument = User & Document;

@Schema(options)
export class User extends Document{
  @ApiProperty({
    example: 'fmdsaf@naver.com',
    description: 'email',
    required: true,
  })
  @Prop({
      required: true,
      unique: true,
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'smith',
    description: 'name',
    required: true,
  })
  @Prop({
      required: true
    })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'gfsdgf45f2',
    description: 'password',
    required: true,
  })
  @Prop({
    required: true
  })
  @IsString()
  @IsNotEmpty()
  password: string;

//   readonly readOnlyData: {id:string, email:string, name: string};
}

export const UserSchema = SchemaFactory.createForClass(User);

// CatSchema.virtual('readOnlyData').get(function (this: Cat){
//   return {
//     id: this.id,
//     email: this.email,
//     name: this.name,
//   }
// })