import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { PrometheusModule } from "@willsoto/nestjs-prometheus";
import { HealthModule } from "./health/health.module";
import { LoggerModule } from "./logger.module";
import { ORMModule } from "./orm.module";
import { QueueModule } from "./queue.module";
import { UserHTTPModule } from "./user/http/module";
import { UserMetricsModule } from "./user/metrics/module";
import { UserQueueModule } from "./user/queue/module";
import { UserWorkerModule } from "./user/worker/module";

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
