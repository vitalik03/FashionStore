import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { DatabaseModule } from '../core/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { usersProviders } from './users.providers';
import { HttpStatus } from '@nestjs/common';
import { Connection } from 'typeorm';




describe('UsersService', () => {
  let service: UsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[ DatabaseModule ],
      providers: [UsersService, ...usersProviders],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('user service', () => {
      let expectedUser = new User();
      expectedUser.firstName = 'Vitaliy';
      expectedUser.lastName = 'Vovryk';
      expectedUser.email = 'vitalik@gmail.com';
      expectedUser.city = "Lviv";
      expectedUser.state = "Uk";
      expectedUser.zip = "38468";
    it('Should create user', async () => {
        expect(await service.create(expectedUser));
      });

    it('should throw user has already been created on this email', async () => {
      await service.create(expectedUser)
        .catch((error) => {
          expect(error.status).toBe(HttpStatus.FOUND);
          expect(error.message).toBe("User has already been created on this email");
      });
    });
  });
});
