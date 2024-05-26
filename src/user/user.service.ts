import { randomUUID } from "node:crypto";
import { Inject, Injectable } from "@nestjs/common";
import { Effect, pipe } from "effect";
import { RandomService } from "src/random/service";
import { UserEmitter } from "./events/user-emitter";
import { MikroRepository } from "./persistence/mikro.repository";
import { User } from "./user";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
	constructor(
		@Inject(MikroRepository)
		private readonly repository: UserRepository,
		private readonly emitter: UserEmitter,
		private readonly random: RandomService,
	) {
		this.emitter.setContext(UserService.name);
	}

	create(name: string) {
		return pipe(
			this.random.uuid(),
			Effect.map((id) => new User(id, name)),
			Effect.tap((user) => this.repository.persist(user)),
			Effect.tap((user) => this.emitter.created(user)),
		);
	}

	find(id: string) {
		return this.repository.find(id);
	}

	all() {
		return this.repository.findAll();
	}
}
