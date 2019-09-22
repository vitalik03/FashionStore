import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import {roleError} from '../constants/user-responses';
@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private readonly usersService: UsersService){}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const userOne = await this.usersService.findOne(user.email);
        if (userOne && (userOne.role === "ADMIN")){
            return true;
        }
        throw new HttpException(roleError, HttpStatus.UNPROCESSABLE_ENTITY);
    }
}