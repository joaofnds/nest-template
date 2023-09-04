import { INestApplication } from "@nestjs/common";
import { User } from "src/user";
import { SuperAgentTest, agent } from "supertest";

export class ApplicationDriver {
	agent: SuperAgentTest;

	constructor(private readonly app: INestApplication) {
		this.agent = agent(app.getHttpServer());
	}

	async setup() {
		// noop for now
	}

	async teardown() {
		// noop for now
	}

	health() {
		return this.agent.get("/health");
	}

	async createUser(name: string): Promise<User> {
		const response = await this.agent.post("/users").send({ name });
		return User.fromPlain(response.body);
	}

	async findUser(id: string): Promise<User> {
		const response = await this.agent.get(`/users/${id}`);
		return User.fromPlain(response.body);
	}

	async listUsers(): Promise<User[]> {
		const response = await this.agent.get("/users");
		return response.body.map((u) => User.fromPlain(u));
	}
}
