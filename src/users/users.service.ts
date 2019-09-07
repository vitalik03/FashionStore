import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USER_REPOSITORY')
        private readonly userRepository: Repository<IUser>,
    ){}

    async findOne(email: string):Promise<IUser>
    {
        const userFind = await this.userRepository.findOne({
            where: [{ "email": email }]});
		return userFind;
	}
}
