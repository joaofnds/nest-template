import { Injectable, Scope } from "@nestjs/common";
import { EventEmitterService } from "src/event-emitter/service";
import { Tail } from "src/types";
import { UserCreatedEvent } from "./user-created.event";

@Injectable({ scope: Scope.TRANSIENT })
export class UserEmitter {
	private context = "UserEmitter";

	constructor(private readonly emitter: EventEmitterService) {}

	setContext(context: string) {
		this.context = context;
	}

	created(...eventData: Tail<ConstructorParameters<typeof UserCreatedEvent>>) {
		return this.emitter.emit(
			UserCreatedEvent.EventName,
			new UserCreatedEvent(this.context, ...eventData),
		);
	}
}
