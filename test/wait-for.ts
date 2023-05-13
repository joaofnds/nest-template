import { EventEmitter2 } from '@nestjs/event-emitter';

export const waitFor = <T>(emitter: EventEmitter2, event: string) =>
  new Promise<T>((resolve) => emitter.once(event, resolve));
