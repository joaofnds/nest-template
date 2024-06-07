import { HttpStatus } from "@nestjs/common";
import { TestHarness } from "test/harness";

describe("/pokeapi", () => {
	let harness: TestHarness;

	beforeAll(async () => {
		harness = await TestHarness.setup({ useRequestRecorder: true });
	});

	afterAll(async () => {
		await harness.teardown();
	});

	describe("getting a pokemon", () => {
		it("returns the pokemon", async () => {
			const res = await harness.driver.pokeapi.getByName("pikachu");

			expect(res.status).toBe(200);
			expect(res.body).toEqual({
				id: 25,
				name: "pikachu",
				is_default: true,
				height: 4,
				weight: 60,
			});
		});

		describe("when pokemon is not found", () => {
			it("returns not found status", async () => {
				const res = await harness.driver.pokeapi.getByName("does-not-exist");

				expect(res.status).toBe(404);
				expect(res.body).toEqual({
					error: "Not Found",
					statusCode: HttpStatus.NOT_FOUND,
					message:
						'pokemon "https://pokeapi.co/api/v2/pokemon/does-not-exist" not found',
				});
			});
		});
	});
});
