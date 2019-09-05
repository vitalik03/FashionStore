import { Controller, Get, Post, Body, HttpException } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() user: any){
    const userOne = await this.usersService.findOne(user.id);
    if(!userOne){
      throw new HttpException('Not found', 404);
    }
    else{
      const test1 = bcrypt.compareSync(user.lastName, userOne.lastName);
      if(test1){
        return this.authService.login(user);
      }
      else{
        throw new HttpException('Unauthorized', 400);
      }
    }
  }
}

