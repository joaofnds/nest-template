import { Driver } from "./driver";
import {
	UserListResponseSchema,
	type UserResponse,
	UserResponseSchema,
} from "./schemas/user.schema";

export class UserDriver extends Driver {
	async create(name: string): Promise<UserResponse> {
		const response = await this.createReq(name);
		return UserResponseSchema.parse(response.body);
	}

	createReq(name: string) {
		return this.agent.post("/users").send({ name });
	}

	async find(id: string): Promise<UserResponse> {
		const response = await this.findReq(id);
		return UserResponseSchema.parse(response.body);
	}

	findReq(id: string) {
		return this.agent.get(`/users/${id}`);
	}

	async list(): Promise<UserResponse[]> {
		const response = await this.agent.get("/users");
		return UserListResponseSchema.parse(response.body);
	}
}
