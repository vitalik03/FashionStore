import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { saltRounds } from '../configs/bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { IOrder } from 'src/orders/interfaces/order.interface';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
		@Inject('USER_REPOSITORY')
		private readonly userRepository: Repository<User>,
	){}

    async create( user: CreateUserDto ) {

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
        const entity = Object.assign(new User(), user);
		return await this.userRepository.save(entity);
   }
  
    async getUsers(){
        const users = await this.userRepository.find();
        return users;
    }

    async getById(id:string): Promise<User>{
      const testUser = await this.userRepository.findOne(id);
      if(!testUser){
        throw new HttpException("User not found", HttpStatus.NOT_FOUND);
      }
        return await this.userRepository.findOne(id);
    }
    
	  async update(id: string, updateUser: UpdateUserDto): Promise<IUser>{
      const testUser = await this.userRepository.findOne(id);
      if(!testUser){
        throw new HttpException("User not found", HttpStatus.NOT_FOUND);
      }
      return await this.userRepository.save({ ...updateUser, id: Number(id) });
    }
    
    async delete(id: string){
      const user = await this.userRepository.findOne(id);
      if(!user){
        throw new HttpException("User not found", HttpStatus.NOT_FOUND);
      }
      return await this.userRepository.delete(id);
    }

    async findOne(email: string):Promise<User>
    {
        const userFind = await this.userRepository.findOne({
            where: [{ "email": email }]});
		return userFind;
	  }
}
