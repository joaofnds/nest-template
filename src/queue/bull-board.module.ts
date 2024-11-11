import { ExpressAdapter } from "@bull-board/express";
import { BullBoardModule as NestJSBullBoardModule } from "@bull-board/nestjs";
import { Module } from "@nestjs/common";

@Module({
	imports: [
		NestJSBullBoardModule.forRoot({
			route: "/internal/queues",
			adapter: ExpressAdapter,
		}),
	],
})
export class BullBoardModule {}
