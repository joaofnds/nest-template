import { User } from "src/user/user";
import { Driver } from "./driver";

export class UserDriver extends Driver {
	async create(name: string): Promise<User> {
		const response = await this.createReq(name);
		return this.parseUser(response.body);
	}

	createReq(name: string) {
		return this.agent.post("/users").send({ name });
	}

	async find(id: string): Promise<User> {
		const response = await this.findReq(id);
		return this.parseUser(response.body);
	}

	findReq(id: string) {
		return this.agent.get(`/users/${id}`);
	}

	async list(): Promise<User[]> {
		const response = await this.agent.get("/users");
		return response.body.map((u) => this.parseUser(u));
	}

	private parseUser(body): User {
		return new User(body.id, body.name);
	}
}
