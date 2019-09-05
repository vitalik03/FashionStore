import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
    constructor(
		@Inject('USER_REPOSITORY')
		private readonly userRepository: Repository<IUser>,
	){}

	async delete(id: string){
		return await this.userRepository.delete(id);
	}

}
