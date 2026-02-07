import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import {
	BullBoardQueueOptions,
	BullBoardModule as NestJSBullBoardModule,
} from "@bull-board/nestjs";
import { Module, OnModuleDestroy, OnModuleInit } from "@nestjs/common";

@Module({
	imports: [
		NestJSBullBoardModule.forRoot({
			route: "/internal/queues",
			adapter: ExpressAdapter,
		}),
	],
})
export class BullBoardModule implements OnModuleInit, OnModuleDestroy {
	static forFeature(options: Omit<BullBoardQueueOptions, "adapter">) {
		return NestJSBullBoardModule.forFeature({
			adapter: BullMQAdapter,
			...options,
		});
	}

	onModuleDestroy() {}

	onModuleInit() {}
}
