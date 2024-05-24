import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { UserCreatedEvent } from "../events/user-created.event";
import { UserCreatedQueue } from "./user-created.queue";

@Injectable()
export class QueueUserListener {
	constructor(private readonly userCreatedQueue: UserCreatedQueue) {}

	@OnEvent(UserCreatedEvent.EventName)
	onUserCreated(event: UserCreatedEvent) {
		this.userCreatedQueue.schedule(event);
	}
}
