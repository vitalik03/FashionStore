import { Controller, Get, Post, Body, HttpStatus, HttpException, Param, Put } from '@nestjs/common';
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

    @Get()
    async getUsers(): Promise<IUser[]> {
      return this.usersService.getUsers();
    };

    @Get(':id')
    async getById(@Param('id') id: string): Promise<IUser>{
        return await this.usersService.getById(id);
    }
    
	@Put(':id')
	async update(@Param('id') id: string, @Body() updateUser: CreateUserDto){
		return await this.usersService.update(id, updateUser);
	}

}
