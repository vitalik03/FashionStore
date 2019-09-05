import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Connection } from 'typeorm';

describe('AppController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/login')
      .expect(200)
  });

  it('/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/login')
      .expect(404)
      .expect({
        statusCode: 404,
        message: 'Not found'
      })
  });

  afterAll(async () => {
    const connection = app.get(Connection);
    connection.close();
  });
});
