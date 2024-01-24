import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { ApplicationDriver } from "test/application-driver";
import { DBCleaner } from "test/db-cleaner";

describe("/users", () => {
	let app: INestApplication;
	let driver: ApplicationDriver;
	let dbCleaner: DBCleaner;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();

		dbCleaner = DBCleaner.for(app);
		driver = new ApplicationDriver(app);
		await driver.setup();
		await app.listen(3000);
	});

	afterAll(async () => {
		await driver.teardown();
		await app.close();
	});

	beforeEach(async () => {
		await dbCleaner.clean();
	});

	it("create user", async () => {
		const name = "joao";
		const user = await driver.createUser(name);
		expect(user.name).toEqual(name);
	});

	it("finds created user", async () => {
		const user = await driver.createUser("joao");
		const found = await driver.findUser(user.id);
		expect(found).toEqual(user);
	});

	it("validates user id", async () => {
		await driver.createUser("joao");

		const response = await driver.findUserReq("invalid-id");

		expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
		expect(response.body).toEqual({
			statusCode: 400,
			message: "Validation failed (uuid is expected)",
			error: "Bad Request",
		});
	});

	it("lists created users", async () => {
		const user = await driver.createUser("joao");
		const users = await driver.listUsers();
		expect(users).toContainEqual(user);
	});
});
