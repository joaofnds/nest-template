import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import {
	ThrottlerModule as NestThrottlerModule,
	ThrottlerGuard,
} from "@nestjs/throttler";
import { AppConfig } from "src/config/app.config";
import { AppConfigModule } from "src/config/config.module";

@Module({
	imports: [
		NestThrottlerModule.forRootAsync({
			imports: [AppConfigModule],
			inject: [AppConfig],
			useFactory: (config: AppConfig) => [
				{
					ttl: config.throttler.ttl,
					limit: config.throttler.limit,
				},
			],
		}),
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
})
export class ThrottlerModule {}
