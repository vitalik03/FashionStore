import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { Repository } from 'typeorm';

@Injectable()



export class UsersService {
    constructor(
		@Inject('USER_REPOSITORY')
		private readonly userRepository: Repository<IUser>,
	){}

    async create( user: IUser ): Promise<IUser> {
		const firstName = user.firstName;
		const params = {
			firstName
		}
		const testUser = await this.userRepository.findOne(params);
		
		if( testUser && testUser.lastName === user.lastName ){
			throw new HttpException("User has already been created", HttpStatus.FOUND);
		}

		return await this.userRepository.save(user);
	}
}
