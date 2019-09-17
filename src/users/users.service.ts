import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { saltRounds } from '../configs/bcrypt';

@Injectable()
export class UsersService {
    constructor(
		@Inject('USER_REPOSITORY')
		private readonly userRepository: Repository<IUser>,
	){}

    async create( user: IUser ): Promise<IUser> {

		const testUser = await this.userRepository.findOne({ where: [{ "email": user.email }]});
		if( testUser ){
			throw new HttpException("User has already been created on this email", HttpStatus.FOUND);
		}
        const {password = ''} = user;
        if ( password.length < 5 || password.length > 8){
          throw new HttpException( 'Password should have more than 5 and less than 8' , 400 );
        }
        const cryptedPass = bcrypt.hashSync(user.password,saltRounds);
        user.password = cryptedPass;
		return await this.userRepository.save(user);
   }
  
    async getUsers(){
        const users = await this.userRepository.find();
        return users;
    }

    async getById(id:string): Promise<IUser>{
        return await this.userRepository.findOne(id);
    }
    
	  async update(id: string, user: IUser){
      const testUser = await this.userRepository.findOne(id);
      if(!testUser){
        throw new HttpException("User not found", HttpStatus.NOT_FOUND);
      }
      return await this.userRepository.update(id, user);
  	}
    async delete(id: string){
      const user = await this.userRepository.findOne(id);
      if(!user){
        throw new HttpException("User not found", HttpStatus.NOT_FOUND);
      }
      return await this.userRepository.delete(id);
    }

}
