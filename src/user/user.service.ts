import { randomUUID } from "node:crypto";
import { Inject, Injectable } from "@nestjs/common";
import { UserEmitter } from "./events";
import { MikroRepository } from "./mikro.repository";
import { User } from "./user";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
	constructor(
		@Inject(MikroRepository)
		private readonly repository: UserRepository,
		private readonly emitter: UserEmitter,
	) {
		this.emitter.setContext(UserService.name);
	}

	async create(name: string): Promise<User> {
		const user = new User(randomUUID(), name);
		await this.repository.persist(user);
		await this.emitter.created(user);
		return user;
	}

	find(id: string): Promise<User> {
		return this.repository.find(id);
	}

	all(): Promise<User[]> {
		return this.repository.findAll();
	}
}
