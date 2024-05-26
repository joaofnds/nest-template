import { NotFoundError as MikroNotFoundError } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { Effect } from "effect";
import { NotFoundError } from "../errors/not-found.error";
import { RepositoryError } from "../errors/repository.error";
import { User } from "../user";
import { UserRepository } from "../user.repository";

@Injectable()
export class MikroRepository implements UserRepository {
	constructor(private readonly entityManager: EntityManager) {}

	persist(user: User): Effect.Effect<void, RepositoryError> {
		return Effect.tryPromise({
			try: () => this.entityManager.persistAndFlush(user),
			catch: (error) => new RepositoryError(`unknown error: ${error}`),
		});
	}

	find(id: string): Effect.Effect<User, NotFoundError | RepositoryError> {
		return Effect.tryPromise({
			try: () => this.entityManager.findOneOrFail(User, { id }),
			catch: (error) =>
				error instanceof MikroNotFoundError
					? new NotFoundError(id)
					: new RepositoryError(`unknown error: ${error}`),
		});
	}

	findAll(): Effect.Effect<User[], RepositoryError> {
		return Effect.tryPromise({
			try: () => this.entityManager.find(User, {}),
			catch: (error) => new RepositoryError(`unknown error: ${error}`),
		});
	}
}
