import { Module } from "@nestjs/common";
import { AppConfig } from "src/config/app.config";
import { AppConfigModule } from "../config/config.module";
import { DatabaseConfig } from "./config";

@Module({
	imports: [AppConfigModule],
	providers: [
		{
			provide: DatabaseConfig,
			inject: [AppConfig],
			useFactory: (config: AppConfig) => config.database,
		},
	],
	exports: [DatabaseConfig],
})
export class DatabaseModule {}
