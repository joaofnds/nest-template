import {
	afterAll,
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
} from "bun:test";
import { HttpStatus } from "@nestjs/common";
import { FakeHTTPService } from "test/fakes/fake-http.service";
import { useFakeHTTP } from "test/harness/customizations";
import { TestHarness } from "test/harness/harness";

describe("/pokeapi", () => {
	let harness: TestHarness;
	const http = new FakeHTTPService();

	beforeAll(async () => {
		harness = await TestHarness.setup({
			moduleCustomizers: [useFakeHTTP(http)],
		});
	});

	beforeEach(() => {
		http.reset();
	});

	afterAll(async () => {
		await harness.teardown();
	});

	describe("getting a pokemon", () => {
		it("returns the pokemon", async () => {
			http.addResponse(
				new Response(
					JSON.stringify({
						id: 25,
						name: "pikachu",
						is_default: true,
						height: 4,
						weight: 60,
					}),
					{ status: 200 },
				),
			);

			const res = await harness.driver.pokeapi.getByName("pikachu");

			expect(res.status).toBe(200);
			expect(res.body).toEqual({
				id: 25,
				name: "pikachu",
				is_default: true,
				height: 4,
				weight: 60,
			});

			expect(http.requests).toEqual([
				expect.objectContaining({
					method: "get",
					url: "https://pokeapi.co/api/v2/pokemon/pikachu",
				}),
			]);
		});

		describe("when pokemon is not found", () => {
			it("returns not found status", async () => {
				http.addResponse(new Response("Not Found", { status: 404 }));

				const res = await harness.driver.pokeapi.getByName("does-not-exist");

				expect(res.status).toBe(404);
				expect(res.body).toEqual({
					error: "Not Found",
					statusCode: HttpStatus.NOT_FOUND,
					message: 'pokemon "does-not-exist" not found',
				});

				expect(http.requests).toEqual([
					expect.objectContaining({
						method: "get",
						url: "https://pokeapi.co/api/v2/pokemon/does-not-exist",
					}),
				]);
			});
		});
	});
});
