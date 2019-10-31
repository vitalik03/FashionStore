import { Controller, Get, Post, Body, HttpException } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth/auth.service';
import { IUser } from './users/interfaces/user.interface';
import { UserLogin } from './users/dto/create-user.dto';
import { ChangePasswordDto } from './users/dto/change-password.dto';

@Controller()
export class AppController {
    constructor(private readonly userService: UsersService){}

    @Post('change-password')
    async changePassword(@Body() password: ChangePasswordDto): Promise<IUser>{
        return this.userService.changePassword(password);
    }
}
