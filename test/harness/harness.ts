import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { ApplicationDriver } from "../driver/application.driver";
import { ModuleCustomizer } from "./customizations";
import { DBHarness } from "./db-harness";

type TestHarnessConfig = {
	moduleCustomizers?: ModuleCustomizer[];
};

export class TestHarness {
	readonly driver: ApplicationDriver;
	readonly db: DBHarness;

	constructor(
		readonly app: INestApplication,
		readonly config?: TestHarnessConfig,
	) {
		this.driver = ApplicationDriver.for(app);
		this.db = DBHarness.for(app);
	}

	static async setup(config?: TestHarnessConfig) {
		const testingModuleBuilder = Test.createTestingModule({
			imports: [AppModule],
		});

		for (const customizer of config?.moduleCustomizers ?? []) {
			customizer(testingModuleBuilder);
		}

		const testingModule = await testingModuleBuilder.compile();
		const app = testingModule.createNestApplication();

		const harness = new TestHarness(app, config);
		await harness.setup();
		return harness;
	}

	async setup() {
		await this.app.init();
	}

	async teardown() {
		await this.app.close();
	}
}
