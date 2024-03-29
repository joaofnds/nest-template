import { Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { PrometheusModule } from "@willsoto/nestjs-prometheus";
import { ConfigModule } from "./config";
import { HealthModule } from "./health";
import { LoggerModule } from "./logger.module";
import { ORMModule } from "./orm.module";
import { QueueModule } from "./queue.module";
import {
	UserHTTPModule,
	UserMetricsModule,
	UserQueueModule,
	UserWorkerModule,
} from "./user";

@Module({
	imports: [
		ConfigModule,
		ORMModule,
		LoggerModule,
		EventEmitterModule.forRoot({ global: true, wildcard: true }),
		PrometheusModule.register(),
		QueueModule,
		HealthModule,

		UserHTTPModule,
		UserMetricsModule,
		UserQueueModule,
		UserWorkerModule,
	],
})
export class AppModule {}
