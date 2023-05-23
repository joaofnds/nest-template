import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { PinoLogger } from 'nestjs-pino';
import { UserCreatedEvent } from '../events';
import { UserCreatedQueue } from './user-created.queue';

@Injectable()
@Processor(UserCreatedQueue.QueueName)
export class UserCreatedProcessor {
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext(UserCreatedProcessor.name);
  }

  @Process(UserCreatedQueue.QueueName)
  update(job: Job<UserCreatedEvent>) {
    this.logger.info(job.data, '🎉🎉🎉🎉🎉🎉 user created 🎉🎉🎉🎉🎉🎉🎉');
  }
}
