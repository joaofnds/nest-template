import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, RedisConfig } from './config';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [RedisConfig],
      useFactory: (redisConfig: RedisConfig) => ({ redis: redisConfig.uri }),
    }),
  ],
})
export class QueueModule {}
