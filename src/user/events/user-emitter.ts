import { Injectable, Scope } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Tail } from 'src/types';
import { UserCreatedEvent } from './user-created.event';

@Injectable({ scope: Scope.TRANSIENT })
export class UserEmitter {
  private context: string;

  constructor(private readonly eventEmitter: EventEmitter2) {}

  setContext(context: string) {
    this.context = context;
  }

  created(...eventData: Tail<ConstructorParameters<typeof UserCreatedEvent>>) {
    this.eventEmitter.emit(
      UserCreatedEvent.EventName,
      new UserCreatedEvent(this.context, ...eventData),
    );
  }
}
