import { INestApplication } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { waitFor } from 'test/wait-for';
import { UserCreatedEvent } from './events';
import { UserService } from './user.service';

describe(UserService, () => {
  let app: INestApplication;
  let service: UserService;
  let emitter: EventEmitter2;

  beforeAll(async () => {
    const appModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = appModule.createNestApplication();

    service = app.get(UserService);
    emitter = app.get(EventEmitter2);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('create', () => {
    it('emits user.created event', async () => {
      const event = waitFor(emitter, UserCreatedEvent.EventName);

      const user = await service.create('joao');

      await expect(event).resolves.toEqual(
        new UserCreatedEvent(UserService.name, user),
      );
    });
  });
});
