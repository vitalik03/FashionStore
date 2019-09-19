import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { saltRounds } from '../configs/bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { IOrder } from 'src/orders/interfaces/order.interface';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

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
    const entity = Object.assign(new User(), user);
    const time = new Date();
    entity.createdAt = time;
    entity.updatedAt = time;
		return await this.userRepository.save(entity);
   }
   
  
    async getUsers(): Promise<IUser[]>{
        const users = await this.userRepository.find();
        return users;
    }

    async getById(id:string): Promise<IUser>{
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
      const time = new Date();
      updateUser.updatedAt = time;
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
    
    async changePassword(password: ChangePasswordDto):Promise<string>{
      const user = await this.userRepository.findOne(password.id);
      if(!user){
        throw new HttpException("User not found", HttpStatus.NOT_FOUND);
      }
      const comparedPasswords = await bcrypt.compareSync(user.password, password.oldPassword);
      if(!comparedPasswords){
        throw new HttpException("Wrong password", 400);
      }
      else{
        const hashedPassword = await bcrypt.hash(password.newPassword, 10);
        user.password = hashedPassword;
        await this.userRepository.save({user, id: Number(password.id)});
        return "Success" ;
      }
    }
}
