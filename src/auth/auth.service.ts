import { Injectable, HttpException } from '@nestjs/common';
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { UserLogin } from '../users/dto/create-user.dto';
import { getRepository } from 'typeorm';
import { User } from 'src/users/users.entity';
@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}
    

    async validate(user: UserLogin){
      const userOne = await getRepository(User)
      .createQueryBuilder('userOne')
      .addSelect('userOne.password')
      .where('userOne.email = :email', { email: user.email })
      .getRawOne();
      if(!userOne){
        throw new HttpException('Not found', 404);
      }
      else{
        const comparedPasswords = await bcrypt.compareSync(user.password, userOne.password);
        console.log(user.password, '-------------',userOne.password);
        if(comparedPasswords){
          return this.login(user);
        }
        else{
          throw new HttpException('Unauthorized', 400);
        }
      }
  }
   async login(user: UserLogin){
        const payload = { email: user.email, password: user.password};
        const userOne = await this.usersService.findOne(user.email);
        return {
          access_token: this.jwtService.sign(payload),
          user_id: userOne.id
        };
    }
    
}
