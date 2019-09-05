import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './users.entity';




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

  describe('user service', () => {
    it('Should create user', async () => {
      let expectedUser = new User();
      expectedUser.firstName = 'Vitalik';
      expectedUser.lastName = 'Vovryk';
      expectedUser.email = 'vit@gmail.com';
      expectedUser.city = "Lviv";
      expectedUser.state = "Uk";
      expectedUser.zip = "38468";
      expect(await service.create(expectedUser));
    });
  });
});
