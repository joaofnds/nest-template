import { ServiceUnavailableException } from "@nestjs/common";
import {
	HealthCheckError,
	HealthIndicatorResult,
	HealthIndicatorStatus,
	MemoryHealthIndicator,
	MikroOrmHealthIndicator,
	TerminusModule,
} from "@nestjs/terminus";
import { Test, TestingModule } from "@nestjs/testing";
import { RedisHealthIndicator } from "src/redis/health-indicator";
import { HealthController } from "./health.controller";
import { HealthModule } from "./health.module";

describe("HealthController", () => {
	let controller: HealthController;
	let memoryIndicator: FakeMemoryHealthIndicator;
	let mikroORMIndicator: FakeMikroORMHealthIndicator;
	let redisIndicator: FakeRedisHealthIndicator;

	beforeEach(async () => {
		memoryIndicator = new FakeMemoryHealthIndicator();
		mikroORMIndicator = new FakeMikroORMHealthIndicator();
		redisIndicator = new FakeRedisHealthIndicator();

		const module: TestingModule = await Test.createTestingModule({
			imports: [TerminusModule],
			providers: [
				{
					provide: RedisHealthIndicator,
					useValue: redisIndicator,
				},
			],
			controllers: [HealthController],
		})
			.overrideProvider(MemoryHealthIndicator)
			.useValue(memoryIndicator)
			.overrideProvider(MikroOrmHealthIndicator)
			.useValue(mikroORMIndicator)
			.compile();

		controller = module.get<HealthController>(HealthController);
	});

	describe("when services are up", () => {
		it("returns status ok", async () => {
			const { status } = await controller.check();
			expect(status).toBe("ok");
		});

		it("reports heap memory status", async () => {
			const { info } = await controller.check();
			expect(info?.memory_heap).toEqual({ status: "up" });
		});

		it("reports rss memory status", async () => {
			const { info } = await controller.check();
			expect(info?.memory_rss).toEqual({ status: "up" });
		});

		it("reports mikro-orm status", async () => {
			const { info } = await controller.check();
			expect(info?.database).toEqual({ status: "up" });
		});

		it("reports redis status", async () => {
			const { info } = await controller.check();
			expect(info?.redis).toEqual({ status: "up" });
		});
	});

	describe("when heap memory check fails", () => {
		it("reports the failure", async () => {
			memoryIndicator.setNextHeapStatus("down");

			await expect(() => controller.check()).rejects.toThrow(
				ServiceUnavailableException,
			);
		});
	});

	describe("when rss memory check fails", () => {
		it("reports the failure", async () => {
			memoryIndicator.setNextRSSStatus("down");

			await expect(() => controller.check()).rejects.toThrow(
				ServiceUnavailableException,
			);
		});
	});

	describe("when mikro-orm check fails", () => {
		it("reports the failure", async () => {
			mikroORMIndicator.setNextStatus("down");

			await expect(() => controller.check()).rejects.toThrow(
				ServiceUnavailableException,
			);
		});
	});

	describe("when redis check fails", () => {
		it("reports the failure", async () => {
			redisIndicator.setNextStatus("down");

			await expect(() => controller.check()).rejects.toThrow(
				ServiceUnavailableException,
			);
		});
	});
});

class FakeMemoryHealthIndicator {
	nextHeapStatus: HealthIndicatorStatus = "up";
	nextRSSStatus: HealthIndicatorStatus = "up";

	setNextHeapStatus(status: HealthIndicatorStatus) {
		this.nextHeapStatus = status;
	}

	setNextRSSStatus(status: HealthIndicatorStatus) {
		this.nextRSSStatus = status;
	}

	checkHeap(key: string): Promise<HealthIndicatorResult> {
		if (this.nextHeapStatus === "down") {
			this.nextHeapStatus = "up";
			return Promise.reject(
				new HealthCheckError("failed for some reason", "for no cause at all"),
			);
		}

		return Promise.resolve({ [key]: { status: "up" } });
	}

	checkRSS(key: string): Promise<HealthIndicatorResult> {
		if (this.nextRSSStatus === "down") {
			this.nextRSSStatus = "up";
			return Promise.reject(
				new HealthCheckError("failed for some reason", "for no cause at all"),
			);
		}

		return Promise.resolve({ [key]: { status: "up" } });
	}
}

class FakeMikroORMHealthIndicator {
	nextStatus: HealthIndicatorStatus = "up";

	setNextStatus(status: HealthIndicatorStatus) {
		this.nextStatus = status;
	}

	pingCheck(key: string): Promise<HealthIndicatorResult> {
		if (this.nextStatus === "down") {
			this.nextStatus = "up";
			return Promise.reject(
				new HealthCheckError("failed for some reason", "for no cause at all"),
			);
		}

		return Promise.resolve({ [key]: { status: "up" } });
	}
}

class FakeRedisHealthIndicator {
	nextStatus: HealthIndicatorStatus = "up";

	setNextStatus(status: HealthIndicatorStatus) {
		this.nextStatus = status;
	}

	check(key: string): Promise<HealthIndicatorResult> {
		if (this.nextStatus === "down") {
			this.nextStatus = "up";
			return Promise.reject(
				new HealthCheckError("failed for some reason", "for no cause at all"),
			);
		}

		return Promise.resolve({ [key]: { status: "up" } });
	}
}
