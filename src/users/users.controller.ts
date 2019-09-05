import { Controller, Put, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}
    
	@Put(':id')
	async update(@Param('id') id: string, @Body() updateUser: CreateUserDto){
		return await this.usersService.update(id, updateUser);
	}

}
