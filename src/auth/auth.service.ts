import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

   async login(user: any){
        const payload = { username: user.username, password: user.password, role: user.role};
        return {access_token: this.jwtService.sign(payload)};
    }
    
}
