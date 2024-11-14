import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { get } from "lodash";
import { AppConfig } from "./app.config";
import { ConfigLoader } from "./config-loader";

@Module({
	imports: [
		ConfigModule.forRoot({
			ignoreEnvVars: true,
			load: [() => new ConfigLoader().load()],
		}),
	],
	providers: [
		{
			provide: AppConfig,
			inject: [ConfigService],
			useFactory: (config: ConfigService) =>
				AppConfig.parse(get(config, "internalConfig")),
		},
	],
	exports: [AppConfig],
})
export class AppConfigModule {}
