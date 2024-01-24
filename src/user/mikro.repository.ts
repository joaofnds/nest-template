import { NotFoundError } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { NotFoundError as UserNotFoundError, RepositoryError } from "./errors";
import { User } from "./user";
import { UserRepository } from "./user.repository";

@Injectable()
export class MikroRepository implements UserRepository {
	constructor(private readonly entityManager: EntityManager) {}

	async persist(user: User) {
		await this.entityManager.persistAndFlush(user);
	}

	async find(id: string): Promise<User> {
		try {
			return await this.entityManager.findOneOrFail(User, { id });
		} catch (error) {
			if (error instanceof NotFoundError) {
				throw new UserNotFoundError(id);
			}

			throw new RepositoryError(`unknown error: ${error?.message}`);
		}
	}

	findAll() {
		return this.entityManager.find(User, {});
	}
}
