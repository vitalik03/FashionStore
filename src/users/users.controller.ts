import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';





@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post()
	async create(@Body() createUser: CreateUserDto): Promise<IUser>{
		return await this.usersService.create(createUser);
    }
  
}
