import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class EventEmitterService {
	constructor(private readonly eventEmitter: EventEmitter2) {}

	async emit(event: string, ...values: unknown[]) {
		return await this.eventEmitter.emitAsync(event, ...values);
	}
}
