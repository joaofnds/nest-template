import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { PinoLogger } from "nestjs-pino";
import { UserCreatedEvent } from "../events/user-created.event";
import { UserCreatedQueue } from "../queue/user-created.queue";

@Processor(UserCreatedQueue.QueueName)
export class UserCreatedWorker extends WorkerHost {
	constructor(private readonly logger: PinoLogger) {
		super();
		this.logger.setContext(UserCreatedWorker.name);
	}

	async process(job: Job<UserCreatedEvent>) {
		this.logger.info(job.data, "🎉🎉🎉🎉🎉🎉 user created 🎉🎉🎉🎉🎉🎉🎉");
	}
}
