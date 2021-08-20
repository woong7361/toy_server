import { Controller, Get, Post, Body, Patch, Param, Delete, Injectable, UseFilters, UseGuards,Res, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseUserDto } from './dto/response-user.dto';
import { RequestEmail } from './dto/email-request.dto';
import { HttpExcetionFilter } from 'src/common/exceptionfilter/http-exception.filter';
import { ErrorMessageDto } from 'src/common/dto/error-message.dto';
import { LocalAuthGuard } from 'src/auth/gaurd/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/gaurd/jwt-auth.guard';
import { ReqUser } from 'src/common/decorator/req-user.decorator';
import { LoginRequestDto } from './dto/login-request.dto';
import { JwtResponseDto } from './dto/jwt-token.response.dto';
import { Request, Response } from 'express';

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
    private readonly authService: AuthService,
  ) {}

  /*
  ------------------회원가입------------------
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
    ----------------로그인 기능------------------
  */
  @ApiResponse({
    status: 200,
    description: '성공',
    type: JwtResponseDto,
  })
  @ApiBody({
    type:LoginRequestDto
  })
  @ApiOperation({summary: '로그인-JWT발급-header<Bearer>로 받음' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@ReqUser() user:LoginRequestDto) {
    return this.authService.login(user);     //access_token:"..." 발급 - JWT
  }

  /*
    ------------------로그인 테스트용-----------------
  */
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ResponseUserDto
  })
  @ApiOperation({summary: '로그인 테스트용' })
  @UseGuards(JwtAuthGuard)
  @Get('login/confirm')
  getProfile(@ReqUser() user) {
    return user;
  }

  /*
    ------------------쿠키 로그인------------------
  */
  @ApiResponse({
    status: 200,
    description: '성공',
  })
  @ApiCookieAuth('Authorization')
  @ApiBody({
    type:LoginRequestDto
  })
  @ApiOperation({summary: '로그인에 성공하면 쿠키를 반환해줌 {Authorization=.......}'})
  @UseGuards(LocalAuthGuard)
  @Post('login/cookie')
  async loginByCookie(
    @Res({ passthrough: true }) res: Response, 
    @ReqUser() user: LoginRequestDto) {

    const {jwtToken, ...options} = this.authService.login(user);
    res.cookie('Authorization', jwtToken,{                               //쿠키 옵션 설정하기(보안)
      ...options
    });
    // return user;
  }

  /*
    ------------------쿠키 로그아웃------------------
  */
  @ApiResponse({
    status: 200,
    description: '성공',
  })
  @ApiOperation({summary: '로그아웃 - 쿠키지워버림'})
  @Get('logout')
  async logoutByCookie(
    @Res({ passthrough: true }) res: Response) {

    const {jwtToken, ...options} = this.authService.logout();
    //쿠키 옵션 설정하기(보안)
    res.cookie('Authorization', jwtToken,{
      ...options
    });
  }

  /*
  -----------------회원 전체 리스트 확인---------------
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
  -------------------email로 회원 찾기----------------------
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
  ------------------email로 회원 삭제하기-----------------
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
