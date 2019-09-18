import { Controller, Get, Post, Body, HttpException } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth/auth.service';
import { IUser } from './users/interfaces/user.interface';
import { IUserLogin } from './users/interfaces/user.login.interface';
import { CreateUserLoginDto } from './users/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() user: CreateUserLoginDto){
    return await this.authService.validate(user);
  }
}

