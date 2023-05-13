import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [HttpModule, TerminusModule],
  controllers: [HealthController],
})
export class HealthModule {}
