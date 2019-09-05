import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw user not found after delete user with id 1', async () => {
    await service.delete('1')
      .catch((error) => {
        expect(error.status).toBe(404);
        expect(error.message).toBe("Not found");
    });
  });
});
