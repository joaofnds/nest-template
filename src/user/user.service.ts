import { Inject, Injectable } from "@nestjs/common";
import { RandomService } from "src/random/service";
import { UserEmitter } from "./events/user-emitter";
import { MikroUserRepository } from "./persistence/mikro.repository";
import { User } from "./user";
import type { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
	constructor(
		@Inject(MikroUserRepository)
		private readonly repository: UserRepository,
		private readonly emitter: UserEmitter,
		private readonly random: RandomService,
	) {
		this.emitter.setContext(UserService.name);
	}

	async create(name: string) {
		const user = new User(this.random.uuid(), name);

		await this.repository.persist(user);
		this.emitter.created(user);

		return user;
	}

	find(id: string) {
		return this.repository.find(id);
	}

	all() {
		return this.repository.findAll();
	}
}
