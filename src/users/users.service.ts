import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
    constructor(
		@Inject('USER_REPOSITORY')
		private readonly userRepository: Repository<IUser>,
    ){}
    
	async update(id: string, user: IUser){
		return await this.userRepository.update(id, user);
	}
}
