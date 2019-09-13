import { Controller, Get, Post, Body, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse } from '@nestjs/swagger';





@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post()
    @ApiResponse({ status: 201, description: 'User has been successfully created.'})
    @ApiResponse({ status: HttpStatus.FOUND, description: 'User has already been created on this email.'})
	async create(@Body() createUser: CreateUserDto): Promise<IUser>{
		return await this.usersService.create(createUser);
    }
  
}
