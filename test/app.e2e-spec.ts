import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

/** 
 * CAUTION: IF YOU RUN E2E TESTING OUTSIDE CONTAINER ENVIRONMENT, YOU NEED TO EXPOSE ALL NEEDED PORTS TO LOCAL,
 * AND USE `localhost` AS HOST NAME OF ALL CONTAINER SERVICES. IF NOT, EVERY TEST CASES WILL FAIL DUE TO DNS SERVER ERROR.
 * 
 * Sincerely,
 * Harry
 */
describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(404)
      .expect('Not Found');
  });

  it('/brands/one (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(400)
      .expect('Bad Request');
  });

  it('/products (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200);
  });
});
