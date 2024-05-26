import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrometheusModule } from "@willsoto/nestjs-prometheus";
import { DatabaseModule } from "./database/module";
import { ORMModule } from "./database/orm";
import { EventEmitterModule } from "./event-emitter/module";
import { HealthModule } from "./health/health.module";
import { LoggerModule } from "./logger.module";
import { PokeAPIHTTPModule } from "./pokeapi/http/module";
import { QueueModule } from "./queue.module";
import { RedisModule } from "./redis/module";
import { ThrottlerModule } from "./throttler/module";
import { UserHTTPModule } from "./user/http/module";
import { UserMetricsModule } from "./user/metrics/module";
import { UserQueueModule } from "./user/queue/module";
import { UserWorkerModule } from "./user/worker/module";

@Module({
	imports: [
		ConfigModule,
		ThrottlerModule,
		RedisModule,
		DatabaseModule,
		ORMModule,
		LoggerModule,
		EventEmitterModule,
		PrometheusModule.register(),
		QueueModule,
		HealthModule,

		UserHTTPModule,
		UserMetricsModule,
		UserQueueModule,
		UserWorkerModule,

		PokeAPIHTTPModule,
	],
})
export class AppModule {}
