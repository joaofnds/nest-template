import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { DBCleaner } from "./db-cleaner";
import { ApplicationDriver } from "./driver/application.driver";

export class TestHarness {
	readonly driver: ApplicationDriver;
	readonly dbCleaner: DBCleaner;

	constructor(readonly app: INestApplication) {
		this.driver = ApplicationDriver.for(app);
		this.dbCleaner = DBCleaner.for(app);
	}

	static async setup() {
		const moduleFixture = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();
		const app = moduleFixture.createNestApplication();
		await app.init();

		const harness = new TestHarness(app);
		await harness.setup();
		return harness;
	}

	async setup() {}

	async teardown() {
		await this.app.close();
	}
}
