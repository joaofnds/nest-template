import { Module } from "@nestjs/common";
import {
	ConfigService,
	ConfigModule as NestConfigModule,
} from "@nestjs/config";
import { get } from "lodash";
import { AppConfig } from "./app.config";
import { ConfigLoader } from "./config-loader";

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
	],
	exports: [AppConfig],
})
export class ConfigModule {}
