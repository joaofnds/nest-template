import { Module } from "@nestjs/common";
import { Redis } from "ioredis";
import { AppConfig } from "src/config/app.config";
import { AppConfigModule } from "src/config/config.module";
import { RedisConfig } from "./config";
import { RedisHealthIndicator } from "./health-indicator";

@Module({
	imports: [AppConfigModule],
	providers: [
		{
			provide: RedisConfig,
			inject: [AppConfig],
			useFactory: (config: AppConfig) => config.redis,
		},
		{
			provide: Redis,
			inject: [RedisConfig],
			useFactory: (config: RedisConfig) =>
				new Redis(config.url, { family: config.family }),
		},
		RedisHealthIndicator,
	],
	exports: [RedisConfig, Redis, RedisHealthIndicator],
})
export class RedisModule {}
