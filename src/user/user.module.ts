import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { makeCounterProvider } from '@willsoto/nestjs-prometheus';
import { UserEmitter } from './events';
import { MikroRepository } from './mikro.repository';
import { UserCreatedQueue } from './queues';
import { UserCreatedProcessor } from './queues/user-created.processor';
import { UserListener } from './user-listener';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([User]),
    BullModule.registerQueue({ name: UserCreatedQueue.QueueName }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    MikroRepository,
    UserEmitter,
    UserListener,

    UserCreatedQueue,
    UserCreatedProcessor,

    makeCounterProvider({
      name: 'users_created',
      help: 'count of users created',
    }),
  ],
})
export class UserModule {}
