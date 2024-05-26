import { Module } from "@nestjs/common";
import { EventEmitterModule as NestEventEmitterModule } from "@nestjs/event-emitter";
import { EventEmitterService } from "./service";

@Module({
	imports: [NestEventEmitterModule.forRoot({ global: true, wildcard: true })],
	providers: [EventEmitterService],
	exports: [EventEmitterService],
})
export class EventEmitterModule {}
