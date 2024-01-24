import { INestApplication } from "@nestjs/common";
import { agent } from "supertest";
import { Driver } from "./driver";
import { UserDriver } from "./user.driver";

export class ApplicationDriver extends Driver {
	readonly users = new UserDriver(this.agent);

	static for(app: INestApplication) {
		return new ApplicationDriver(agent(app.getHttpServer()));
	}

	health() {
		return this.agent.get("/health");
	}
}
