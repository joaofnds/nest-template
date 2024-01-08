import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";
import { time } from "src/lib/time";
import { UserCreatedEvent } from "../events";

@Injectable()
export class UserCreatedQueue {
	public static readonly QueueName: "user.created";

	constructor(
		@InjectQueue(UserCreatedQueue.QueueName)
		private readonly queue: Queue<UserCreatedEvent>,
	) {}

	async schedule(event: UserCreatedEvent) {
		await this.queue.add(event, {
			jobId: event.user.id,
			removeOnComplete: true,
			attempts: 5,
			backoff: { type: "fixed", delay: 5 * time.Second },
		});
	}
}
