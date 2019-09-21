import { Controller, Request, UseGuards, Body, Post, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserLogin } from '../users/dto/create-user.dto';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiUseTags('auth')
@Controller()
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('login')
    async login(@Body() user: UserLogin) {
       return await this.authService.login(user);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getProfile(@Request() req) {
        return req.user;
    }

}
