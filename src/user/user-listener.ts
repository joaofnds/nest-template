import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';
import { UserCreatedEvent } from './events';
import { UserCreatedQueue } from './queues';

@Injectable()
export class UserListener {
  constructor(
    private readonly userCreatedQueue: UserCreatedQueue,
    @InjectMetric('users_created')
    private readonly usersCreatedCounter: Counter<string>,
  ) {}

  @OnEvent(UserCreatedEvent.EventName)
  onUserCreated(event: UserCreatedEvent) {
    this.usersCreatedCounter.inc();
    this.userCreatedQueue.schedule(event);
  }
}
