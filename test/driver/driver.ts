import TestAgent from "supertest/lib/agent";
import Test from "supertest/lib/test";

export class Driver {
	constructor(protected readonly agent: TestAgent<Test>) {}
}
