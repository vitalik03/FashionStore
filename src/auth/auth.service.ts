import { Injectable, HttpException } from '@nestjs/common';
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { IUserLogin } from 'src/users/interfaces/user.login.interface';
@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}
    async validate(user: IUserLogin){
    const userOne = await this.usersService.findOne(user.email);
    if(!userOne){
      throw new HttpException('Not found', 404);
    }
    else{
      if(user.password === userOne.password){
        return this.login(user);
      }
      else{
        throw new HttpException('Unauthorized', 400);
      }
    }
}
   async login(user: IUserLogin){
        const payload = { email: user.email, password: user.password};
        return {access_token: this.jwtService.sign(payload)};
    }
    
}
