import assert from "node:assert";
import path from "node:path";
import nock from "nock";

export class RequestRecorder {
	private nockBack: { nockDone: () => void; context: nock.BackContext };

	async setup() {
		nock.back.fixtures = "test/nock/fixtures";
		nock.back.setMode(this.getMode());
		this.nockBack = await nock.back(this.fixturePath(), {
			after: () => nock.enableNetConnect("127.0.0.1"),
			afterRecord: (outputs) =>
				outputs.filter((o) => !o.scope.toString().includes("127.0.0.1")),
		});
	}

	async teardown() {
		this?.nockBack?.nockDone();
		nock.restore();
		nock.cleanAll();
	}

	private fixturePath() {
		const state = expect.getState();
		assert(state.testPath, "testPath is not defined");

		return path
			.relative(process.cwd(), state.testPath)
			.replace(/\.test\.ts$/, ".json");
	}

	private getMode() {
		switch (process.env.NOCK_MODE) {
			case "wild":
			case "dryrun":
			case "record":
			case "update":
				return process.env.NOCK_MODE;
			default:
				return "lockdown";
		}
	}
}
