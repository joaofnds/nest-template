import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Effect } from "effect";

@Injectable()
export class EventEmitterService {
	constructor(private readonly eventEmitter: EventEmitter2) {}

	emit(event: string, ...values: unknown[]) {
		return Effect.promise(() => this.eventEmitter.emitAsync(event, ...values));
	}
}
