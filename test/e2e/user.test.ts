import { HttpStatus } from "@nestjs/common";
import { ApplicationDriver } from "test/driver/application.driver";
import { TestHarness } from "test/harness";
import { containing } from "test/util/containing";

describe("/users", () => {
	let harness: TestHarness;
	let driver: ApplicationDriver;

	beforeAll(async () => {
		harness = await TestHarness.setup();
		driver = harness.driver;
	});

	beforeEach(async () => {
		await harness.dbCleaner.clean();
	});

	afterAll(async () => {
		await harness.teardown();
	});

	it("create user", async () => {
		const name = "joao";
		const user = await driver.users.create(name);
		expect(user.name).toEqual(name);
	});

	it("finds created user", async () => {
		const user = await driver.users.create("joao");
		const found = await driver.users.find(user.id);
		expect(found).toEqual(user);
	});

	it("validates user id", async () => {
		await driver.users.create("joao");

		const response = await driver.users.findReq("invalid-id");

		expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
		expect(response.body).toEqual({
			statusCode: 400,
			message: "Validation failed (uuid is expected)",
			error: "Bad Request",
		});
	});

	it("lists created users", async () => {
		const user = await driver.users.create("joao");
		const users = await driver.users.list();
		expect(users).toContainEqual(user);
	});

	describe("when name is not provided", () => {
		it("returns bad request", async () => {
			const response = await driver.users.createReq("");
			expect(response).toEqual(
				containing({
					status: 400,
					body: {
						statusCode: 400,
						errors: [
							{
								path: ["name"],
								message: "String must contain at least 3 character(s)",
							},
						],
					},
				}),
			);
		});
	});
});
