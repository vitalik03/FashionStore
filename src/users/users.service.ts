import { Injectable, Inject } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { Repository } from 'typeorm';

@Injectable()



export class UsersService {
    constructor(
		@Inject('USER_REPOSITORY')
		private readonly userRepository: Repository<IUser>,
	){}

    async create(user: IUser): Promise<IUser>{
		return await this.userRepository.save(user);
	}
}
