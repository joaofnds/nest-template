import { Module } from "@nestjs/common";
import { PrometheusModule } from "@willsoto/nestjs-prometheus";
import { AppConfigModule } from "./config/config.module";
import { DatabaseModule } from "./database/module";
import { ORMModule } from "./database/orm";
import { EventEmitterModule } from "./event-emitter/module";
import { HealthModule } from "./health/health.module";
import { AppLoggerModule } from "./logger/logger.module";
import { PokeAPIHTTPModule } from "./pokeapi/http/module";
import { BullBoardModule } from "./queue/bull-board.module";
import { QueueModule } from "./queue/queue.module";
import { RedisModule } from "./redis/module";
import { ThrottlerModule } from "./throttler/module";
import { UserHTTPModule } from "./user/http/module";
import { UserMetricsModule } from "./user/metrics/module";
import { UserQueueModule } from "./user/queue/module";
import { UserWorkerModule } from "./user/worker/module";

@Module({
	imports: [
		AppConfigModule,
		AppLoggerModule,
		ThrottlerModule,
		RedisModule,
		DatabaseModule,
		ORMModule,
		EventEmitterModule,
		PrometheusModule.register(),
		QueueModule,
		BullBoardModule,
		HealthModule,

		UserHTTPModule,
		UserMetricsModule,
		UserQueueModule,
		UserWorkerModule,

		PokeAPIHTTPModule,
	],
})
export class AppModule {}
