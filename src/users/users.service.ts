import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { Repository, getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { saltRounds } from '../configs/bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { IOrder } from 'src/orders/interfaces/order.interface';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import {userNotFound, existingEmail, wrongPassword, similarPasswords} from '../constants/user-responses'
@Injectable()
export class UsersService {
    constructor(
		@Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>	){}

    async create( user: CreateUserDto ) {

		const testUser = await this.userRepository.findOne({ where: [{ "email": user.email }]});
		if( testUser ){
			throw new HttpException(existingEmail, HttpStatus.FOUND);
		}
    const entity = Object.assign(new User(), user);
		return await this.userRepository.save(entity);
   }
   
  
    async getUsers(): Promise<IUser[]>{
        const users = await this.userRepository.find();
        return users;
    }

    async getById(id:string): Promise<IUser>{
      const testUser = await this.userRepository.findOne(id);
      if(!testUser){
        throw new HttpException(userNotFound, HttpStatus.NOT_FOUND);
      }
        return await this.userRepository.findOne(id);
    }
    
	  async update(id: string, updateUser: UpdateUserDto): Promise<IUser>{
      const testUser = await this.userRepository.findOne(id);
      if(!testUser){
        throw new HttpException(userNotFound, HttpStatus.NOT_FOUND);
      }
      return await this.userRepository.save({ ...updateUser, id: Number(id) });
    }
    
    async delete(id: string){
      const user = await this.userRepository.findOne(id);
      if(!user){
        throw new HttpException(userNotFound, HttpStatus.NOT_FOUND);
      }
      return await this.userRepository.delete(id);
    }

    async findOne(email: string):Promise<User>
    {
        const userFind = await this.userRepository.findOne({
            where: [{ "email": email }]});
		return userFind;
    }
    
    async changePassword(password: ChangePasswordDto):Promise<IUser>{
      if(password.oldPassword === password.newPassword){
        throw new HttpException(similarPasswords, HttpStatus.BAD_REQUEST);
      }
      const user = await getRepository(User)
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id = :id', { id: password.id })
      .getRawOne();
      if(!user){
        throw new HttpException(userNotFound, HttpStatus.NOT_FOUND);
      }
      const comparedPasswords = await bcrypt.compareSync(password.oldPassword, user.password);
      if(!comparedPasswords){
        throw new HttpException(wrongPassword, HttpStatus.FORBIDDEN);
      }
      if(password.newPassword.length<8 || password.newPassword.length>20){
        throw new HttpException(wrongPassword, HttpStatus.BAD_REQUEST);
      }
      user.password = password.newPassword;
      const entity = Object.assign(new User(), user);
      return await this.userRepository.save({entity, id: Number(password.id)});
    }
}
