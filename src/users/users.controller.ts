import { Controller, Get, Post, Body, Patch, Param, Delete, Injectable, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseUserDto } from './dto/response-user.dto';
import { RequestEmail } from './dto/email-request.dto';
import { HttpExcetionFilter } from 'src/common/exceptionfilter/http-exception.filter';
import { ErrorMessageDto } from 'src/common/dto/error-message.dto';

@Controller('api/users')
@ApiTags('User')
@UseFilters(HttpExcetionFilter)
@ApiResponse({
  status: 400,
  description: '실패',
  type: ErrorMessageDto,
})
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  /*
  회원가입
  */
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ResponseUserDto,
  })
  @ApiOperation({summary: '회원가입' })
  @Post('account')
  async createAccount(@Body() createUserData: CreateUserDto) {
    return await this.usersService.createAccount(createUserData);
  }

  /*
  회원 전체 리스트 확인
  */
  @ApiResponse({
    status: 200,
    description: '성공',
    type: [ResponseUserDto],
  })
  @ApiOperation({summary: '회원 전체 조회' })
  @Get('list/all')
  async findAll() {
    return await this.usersService.findAllUser()
  }

  /*
  email로 회원 찾기
  */
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ResponseUserDto,
  })
  @ApiOperation({summary: '이메일로 회원 조회' })
  @Get('list/:email')
  async findOne(@Param() email:RequestEmail) {                    //email validation 해야함
    return await this.usersService.findByEmail(email);
  }

  /*
  email로 회원 삭제하기
  */
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ResponseUserDto,
  })
  @ApiOperation({summary: '이메일로 회원 삭제' })
  @Delete('account')
  async deleteAccount(@Body() email:RequestEmail){
    return await this.usersService.deleteAccount(email);
  }
}
