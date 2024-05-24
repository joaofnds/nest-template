import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { ConfigModule } from "./config/config.module";
import { RedisConfig } from "./config/redis.config";

@Module({
	imports: [
		BullModule.forRootAsync({
			imports: [ConfigModule],
			inject: [RedisConfig],
			useFactory: (redisConfig: RedisConfig) => ({ redis: redisConfig.uri }),
		}),
	],
})
export class QueueModule {}
