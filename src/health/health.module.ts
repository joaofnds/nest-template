import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { RedisModule } from "src/redis/module";
import { HealthController } from "./health.controller";

@Module({
	imports: [TerminusModule, RedisModule],
	controllers: [HealthController],
})
export class HealthModule {}
