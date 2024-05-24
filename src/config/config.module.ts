import { Module } from "@nestjs/common";
import {
	ConfigService,
	ConfigModule as NestConfigModule,
} from "@nestjs/config";
import { get } from "lodash";
import { AppConfig } from "./app.config";
import { ConfigLoader } from "./config-loader";
import { DatabaseConfig } from "./database.config";
import { RedisConfig } from "./redis.config";

@Module({
	imports: [
		NestConfigModule.forRoot({
			ignoreEnvVars: true,
			load: [ConfigLoader.load],
		}),
	],
	providers: [
		{
			provide: AppConfig,
			inject: [ConfigService],
			useFactory: (config: ConfigService) => get(config, "internalConfig"),
		},
		{
			provide: DatabaseConfig,
			inject: [AppConfig],
			useFactory: (config: AppConfig) => config.database,
		},
		{
			provide: RedisConfig,
			inject: [AppConfig],
			useFactory: (config: AppConfig) => config.redis,
		},
	],
	exports: [AppConfig, DatabaseConfig, RedisConfig],
})
export class ConfigModule {}
