import { Controller, Get } from "@nestjs/common";
import {
	HealthCheck,
	HealthCheckService,
	MemoryHealthIndicator,
	MikroOrmHealthIndicator,
} from "@nestjs/terminus";
import { size } from "src/lib/size";
import { RedisHealthIndicator } from "src/redis/health-indicator";

@Controller("health")
export class HealthController {
	private readonly heapThreshold = (512 * size.Mebibyte) / size.Byte;
	private readonly rssThreshold = this.heapThreshold * 1.5;

	constructor(
		private readonly health: HealthCheckService,
		private readonly memory: MemoryHealthIndicator,
		private readonly mikroORM: MikroOrmHealthIndicator,
		private readonly redis: RedisHealthIndicator,
	) {}

	@Get()
	@HealthCheck()
	check() {
		return this.health.check([
			() => this.memory.checkHeap("memory_heap", this.heapThreshold),
			() => this.memory.checkRSS("memory_rss", this.rssThreshold),
			() => this.mikroORM.pingCheck("database"),
			() => this.redis.check("redis"),
		]);
	}
}
