import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
    constructor(
		@Inject('USER_REPOSITORY')
		private readonly userRepository: Repository<IUser>,
	){}

	async delete(id: string){
		const user = await this.userRepository.findOne(id);
		if(!user){
			throw new HttpException("User not found", HttpStatus.NOT_FOUND);
		}
		return await this.userRepository.delete(id);
	}

}
