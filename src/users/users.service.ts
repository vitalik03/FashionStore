import { Injectable, Inject, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USER_REPOSITORY')
        private readonly userRepository: Repository<IUser>,
    ){}

    async getById(id:string): Promise<IUser>{
        const user = await this.userRepository.findOne(id);
        if(!user){
            throw await new HttpException('Not found', 404);
        }
        return await this.userRepository.findOne(id);
    }
}
