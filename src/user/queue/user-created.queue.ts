import { InjectQueue } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Queue } from "bullmq";
import { time } from "src/lib/time";
import { UserCreatedEvent } from "../events/user-created.event";

@Injectable()
export class UserCreatedQueue {
	static readonly QueueName = "user.created";

	constructor(
		@InjectQueue(UserCreatedQueue.QueueName)
		private readonly queue: Queue<UserCreatedEvent>,
	) {}

	async schedule(event: UserCreatedEvent) {
		await this.queue.add(UserCreatedQueue.QueueName, event, {
			jobId: event.user.id,
			removeOnComplete: true,
			attempts: 5,
			backoff: { type: "fixed", delay: 5 * time.Second },
		});
	}
}
