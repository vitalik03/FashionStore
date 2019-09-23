import { Controller, Get, Post, Body, HttpStatus, HttpException, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse, ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthGuard } from '@nestjs/passport';
import {succesfulCreating, existingEmail} from '../constants/user-responses'
import { RolesGuard } from 'src/guards/roles-guard';

@ApiUseTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post()
    @ApiResponse({ status: 201, description: 'User was successfully created!'})
    @ApiResponse({ status: 403, description: 'User is in database!'})
	async create(@Body() createUser: CreateUserDto){
        return await this.usersService.create(createUser);
    }
    

    @Get()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiResponse({ status: 200, description: 'List of Users ```[new User()]```' })
    async getUsers(): Promise<IUser[]> {
      return this.usersService.getUsers();
    };

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    @ApiResponse({ status: 200, description: 'User Object ```new User()```' })
    @ApiResponse({ status: 404, description: 'Error Exception ```{ statusCode: 404, message: "Not found" }```' })
    async getById(@Param('id') id: string): Promise<IUser>{
        return await this.usersService.getById(id);
    }
    
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
	@Put(':id')
	async update(@Param('id') id: string, @Body() updateUser: UpdateUserDto): Promise<IUser>{
		return await this.usersService.update(id, updateUser);
	}

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
	@Delete(':id')
	async delete(@Param('id') id:string){
		return await this.usersService.delete(id);
	}
}
