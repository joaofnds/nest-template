import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { ApplicationDriver } from 'test/application-driver';

describe('/health', () => {
  let app: INestApplication;
  let driver: ApplicationDriver;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    driver = new ApplicationDriver(app);
    await driver.setup();
    await app.listen(3000);
  });

  afterAll(async () => {
    await driver.teardown();
    await app.close();
  });

  it('/health', async () => {
    const res = await driver.health();

    expect(res.status).toEqual(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.info.github.status).toBe('up');
    expect(res.body.info.memory_heap.status).toBe('up');
  });
});
