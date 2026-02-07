import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import { TestHarness } from "test/harness/harness";

describe("/health", () => {
	let harness: TestHarness;

	beforeAll(async () => {
		harness = await TestHarness.setup();
	});

	afterAll(async () => {
		await harness.teardown();
	});

	it("/health", async () => {
		const res = await harness.driver.health();

		expect(res.status).toEqual(200);
		expect(res.body.status).toBe("ok");
		expect(res.body.info.memory_heap.status).toBe("up");
		expect(res.body.info.memory_rss.status).toBe("up");
		expect(res.body.info.database.status).toBe("up");
		expect(res.body.info.redis.status).toBe("up");
	});
});
