import { ServiceUnavailableException } from "@nestjs/common";
import {
	HealthCheckError,
	HealthIndicatorResult,
	HealthIndicatorStatus,
	MemoryHealthIndicator,
	TerminusModule,
} from "@nestjs/terminus";
import { Test, TestingModule } from "@nestjs/testing";
import { HealthController } from "./health.controller";

describe("HealthController", () => {
	let controller: HealthController;
	let memoryIndicator: FakeMemoryHealthIndicator;

	beforeEach(async () => {
		memoryIndicator = new FakeMemoryHealthIndicator();

		const module: TestingModule = await Test.createTestingModule({
			imports: [TerminusModule],
			controllers: [HealthController],
		})
			.overrideProvider(MemoryHealthIndicator)
			.useValue(memoryIndicator)
			.compile();

		controller = module.get<HealthController>(HealthController);
	});

	describe("when services are up", () => {
		it("returns status ok", async () => {
			const { status } = await controller.check();
			expect(status).toBe("ok");
		});

		it("reports memory status", async () => {
			const { info } = await controller.check();
			expect(info?.memory_heap).toEqual({ status: "up" });
		});
	});

	describe("when memory check fails", () => {
		it("reports the failure", async () => {
			memoryIndicator.setNextStatus("down");

			await expect(() => controller.check()).rejects.toThrow(
				ServiceUnavailableException,
			);
		});
	});
});

class FakeMemoryHealthIndicator {
	nextStatus: HealthIndicatorStatus = "up";

	setNextStatus(status: HealthIndicatorStatus) {
		this.nextStatus = status;
	}

	checkHeap(key: string): Promise<HealthIndicatorResult> {
		if (this.nextStatus === "down") {
			return Promise.reject(
				new HealthCheckError("failed for some reason", "for no cause at all"),
			);
		}

		return Promise.resolve({ [key]: { status: "up" } });
	}
}
