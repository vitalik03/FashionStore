import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
    constructor(
		@Inject('USER_REPOSITORY')
		private readonly userRepository: Repository<IUser>,
    ){}
    
	async update(id: string, user: IUser){
		const testUser = await this.userRepository.findOne(id);
		if(!testUser){
			throw new HttpException("User not found", HttpStatus.NOT_FOUND);
		}
		return await this.userRepository.update(id, user);
	}
}
