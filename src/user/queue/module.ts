import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { QueueUserListener } from "./listener";
import { UserCreatedQueue } from "./user-created.queue";

@Module({
	imports: [BullModule.registerQueue({ name: UserCreatedQueue.QueueName })],
	providers: [UserCreatedQueue, QueueUserListener],
})
export class UserQueueModule {}
