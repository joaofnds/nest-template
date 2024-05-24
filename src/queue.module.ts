import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { RedisConfig } from "./redis/config";
import { RedisModule } from "./redis/module";

@Module({
	imports: [
		BullModule.forRootAsync({
			imports: [RedisModule],
			inject: [RedisConfig],
			useFactory: (redisConfig: RedisConfig) => ({ redis: redisConfig.uri }),
		}),
	],
})
export class QueueModule {}
