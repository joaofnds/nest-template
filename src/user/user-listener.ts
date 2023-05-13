import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { PinoLogger } from 'nestjs-pino';
import { Counter } from 'prom-client';
import { UserCreatedEvent } from './events';

@Injectable()
export class UserListener {
  constructor(
    private readonly logger: PinoLogger,
    @InjectMetric('users_created')
    private readonly usersCreatedCounter: Counter<string>,
  ) {}

  @OnEvent(UserCreatedEvent.EventName)
  onUserCreated(event: UserCreatedEvent) {
    this.logger.setContext(event.context);
    this.usersCreatedCounter.inc();
    this.logger.info(event, 'user created 🎉');
  }
}
