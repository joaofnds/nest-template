import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { BullBoardModule } from "@bull-board/nestjs";
import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { QueueUserListener } from "./listener";
import { UserCreatedQueue } from "./user-created.queue";

@Module({
	imports: [
		BullModule.registerQueue({ name: UserCreatedQueue.QueueName }),
		BullBoardModule.forFeature({
			name: UserCreatedQueue.QueueName,
			adapter: BullMQAdapter,
		}),
	],
	providers: [UserCreatedQueue, QueueUserListener],
})
export class UserQueueModule {}
