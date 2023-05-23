import { INestApplication } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'node:crypto';
import { AppModule } from 'src/app.module';
import { DBCleaner } from 'test/db-cleaner';
import { waitFor } from 'test/wait-for';
import { RepositoryError, NotFoundError as UserNotFoundError } from './errors';
import { UserCreatedEvent } from './events';
import { UserService } from './user.service';

describe(UserService, () => {
  let app: INestApplication;
  let service: UserService;
  let emitter: EventEmitter2;
  let cleaner: DBCleaner;

  beforeAll(async () => {
    const appModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = appModule.createNestApplication();

    service = app.get(UserService);
    emitter = app.get(EventEmitter2);
    cleaner = DBCleaner.for(app);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await cleaner.clean();
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

  describe('find', () => {
    describe('when not found', () => {
      it('throws user not found', () => {
        const id = randomUUID();
        return expect(service.find(id)).rejects.toThrow(
          new UserNotFoundError(id),
        );
      });
    });

    describe('when is is invalid', () => {
      it('throws user not found', () => {
        return expect(service.find('bad-uuid')).rejects.toThrow(
          new RepositoryError('invalid uuid: bad-uuid'),
        );
      });
    });
  });

  describe('all', () => {
    describe('when db is empty', () => {
      it('returns an empty array', () => {
        return expect(service.all()).resolves.toHaveLength(0);
      });
    });

    it('lists all users', async () => {
      const user = await service.create('joao');
      await expect(service.all()).resolves.toEqual([user]);
    });
  });
});
