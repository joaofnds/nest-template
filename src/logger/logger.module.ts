import { Module } from "@nestjs/common";
import { LoggerModule as PinoLoggerModule } from "nestjs-pino";
import { AppConfig } from "src/config/app.config";
import { AppConfigModule } from "src/config/config.module";

@Module({
	imports: [
		PinoLoggerModule.forRootAsync({
			imports: [AppConfigModule],
			inject: [AppConfig],
			useFactory: (config: AppConfig) => ({
				pinoHttp: { enabled: config.logger.http },
			}),
		}),
	],
})
export class AppLoggerModule {}
