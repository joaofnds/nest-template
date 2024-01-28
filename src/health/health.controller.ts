import { Controller, Get } from "@nestjs/common";
import {
	HealthCheck,
	HealthCheckService,
	MemoryHealthIndicator,
} from "@nestjs/terminus";

@Controller("health")
export class HealthController {
	private readonly heapThreshold = 512 * 1024 * 1024; // 512MB

	constructor(
		private health: HealthCheckService,
		private memory: MemoryHealthIndicator,
	) {}

	@Get()
	@HealthCheck()
	check() {
		return this.health.check([
			() => this.memory.checkHeap("memory_heap", this.heapThreshold),
		]);
	}
}
