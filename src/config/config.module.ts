import { Module } from "@nestjs/common";
import {
	ConfigModule as NestConfigModule,
	ConfigService,
} from "@nestjs/config";
import { get } from "lodash";
import {
	AppConfig,
	ConfigLoader,
	DatabaseConfig,
	RedisConfig,
} from "src/config";

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
