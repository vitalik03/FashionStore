import { Module } from '@nestjs/common';
import { DatabaseModule } from '../core/database.module';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { UsersController } from './users.controller';

@Module({
    imports: [DatabaseModule],
    providers: [UsersService, ...usersProviders],
    controllers: [UsersController],
    exports: [UsersService]
})
export class UsersModule {}
