import { Controller, Request, UseGuards, Body, Post, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserLogin } from '../users/dto/create-user.dto';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';

@ApiUseTags('auth')
@Controller()
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService
    ) {}

    @Post('login')
    async login(@Body() user: UserLogin) {
       return await this.authService.validate(user);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getProfile(@Request() req) {
        const user = req.user;
        const userOne = this.usersService.findOne(user.email);
        return userOne;
    }

}
