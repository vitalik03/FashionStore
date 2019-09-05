import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService){}
    
    @Get(':id')
    async getById(@Param('id') id: string): Promise<IUser>{
        return await this.usersService.getById(id);
    }
}
