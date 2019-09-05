import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USER REPOSITORY')
        private readonly userRepository: Repository<IUser>,
    ){}

    async getById(id:string): Promise<IUser>{
        return await this.userRepository.findOne(id);
    }
}
