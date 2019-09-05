import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';

describe('Users Controller', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

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
