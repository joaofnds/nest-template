import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { DBHarness } from "./db-harness";
import { ApplicationDriver } from "./driver/application.driver";
import { RequestRecorder } from "./nock/recorder";

type TestHarnessConfig = {
	useRequestRecorder?: boolean;
};

export class TestHarness {
	readonly driver: ApplicationDriver;
	readonly db: DBHarness;
	readonly recorder?: RequestRecorder;

	constructor(
		readonly app: INestApplication,
		config?: TestHarnessConfig,
	) {
		this.driver = ApplicationDriver.for(app);
		this.db = DBHarness.for(app);
		if (config?.useRequestRecorder) this.recorder = new RequestRecorder();
	}

	static async setup(config?: TestHarnessConfig) {
		const moduleFixture = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();
		const app = moduleFixture.createNestApplication();
		await app.init();

		const harness = new TestHarness(app, config);
		await harness.setup();
		return harness;
	}

	async setup() {
		await this.recorder?.setup();
	}

	async teardown() {
		await this.app.close();
		await this.recorder?.teardown();
	}
}
