import { Module } from "@nestjs/common";
import { Redis } from "ioredis";
import { AppConfig } from "src/config/app.config";
import { ConfigModule } from "src/config/config.module";
import { RedisConfig } from "./config";

@Module({
	imports: [ConfigModule],
	providers: [
		{
			provide: RedisConfig,
			inject: [AppConfig],
			useFactory: (config: AppConfig) => config.redis,
		},
		{
			provide: Redis,
			inject: [RedisConfig],
			useFactory: (config: RedisConfig) => new Redis(config.uri),
		},
	],
	exports: [RedisConfig, Redis],
})
export class RedisModule {}
