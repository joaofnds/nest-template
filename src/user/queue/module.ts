import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { BullBoardModule } from "src/queue/bull-board.module";
import { QueueUserListener } from "./listener";
import { UserCreatedQueue } from "./user-created.queue";

@Module({
	imports: [
		BullModule.registerQueue({ name: UserCreatedQueue.QueueName }),
		BullBoardModule.forFeature({ name: UserCreatedQueue.QueueName }),
	],
	providers: [UserCreatedQueue, QueueUserListener],
})
export class UserQueueModule {}
