import { Process, Processor } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Job } from "bull";
import { PinoLogger } from "nestjs-pino";
import { UserCreatedEvent } from "../events";
import { UserCreatedQueue } from "../queue";

@Injectable()
@Processor(UserCreatedQueue.QueueName)
export class UserCreatedWorker {
	constructor(private readonly logger: PinoLogger) {
		this.logger.setContext(UserCreatedWorker.name);
	}

	@Process(UserCreatedQueue.QueueName)
	process(job: Job<UserCreatedEvent>) {
		this.logger.info(job.data, "🎉🎉🎉🎉🎉🎉 user created 🎉🎉🎉🎉🎉🎉🎉");
	}
}
