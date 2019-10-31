import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { DatabaseModule } from '../core/database.module';

describe('Users Controller', () => {
  let controller: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [UsersService, ...usersProviders],
      controllers: [UsersController],
      exports: [UsersService],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('controller get by id should be defined', () => {
    const id = '1';
    expect(controller.getById(id)).toBeDefined();
  })
});
