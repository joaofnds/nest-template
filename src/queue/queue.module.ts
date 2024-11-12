import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { RedisConfig } from "../redis/config";
import { RedisModule } from "../redis/module";

@Module({
	imports: [
		BullModule.forRootAsync({
			imports: [RedisModule],
			inject: [RedisConfig],
			useFactory: (redisConfig: RedisConfig) => ({
				connection: { url: redisConfig.url },
			}),
		}),
	],
})
export class QueueModule {}
