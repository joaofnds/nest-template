import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { ApplicationDriver } from 'test/application-driver';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let driver: ApplicationDriver;
  let server;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    driver = new ApplicationDriver(app);
    await driver.setup();
    server = await app.listen(3000);
    await app.init();
  });

  afterAll(async () => {
    await driver.teardown();
    await app.close();
    await server.close();
  });

  it('/health', async () => {
    const res = await driver.health();

    expect(res.status).toEqual(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.info.github.status).toBe('up');
    expect(res.body.info.memory_heap.status).toBe('up');
  });
});
