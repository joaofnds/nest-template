import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { ConfigModule } from './config';
import { HealthModule } from './health';
import { LoggerModule } from './logger.module';
import { ORMModule } from './orm.module';
import { QueueModule } from './queue.module';
import { UserModule } from './user';

@Module({
  imports: [
    ConfigModule,
    ORMModule,
    LoggerModule,
    HealthModule,
    EventEmitterModule.forRoot({ global: true, wildcard: true }),
    UserModule,
    PrometheusModule.register(),
    QueueModule,
  ],
})
export class AppModule {}
