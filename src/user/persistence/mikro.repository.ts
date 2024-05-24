import { NotFoundError as MikroNotFoundError } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { NotFoundError } from "../errors/not-found.error";
import { RepositoryError } from "../errors/repository.error";
import { User } from "../user";
import { UserRepository } from "../user.repository";

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
			if (error instanceof MikroNotFoundError) {
				throw new NotFoundError(id);
			}

			throw new RepositoryError(`unknown error: ${error?.message}`);
		}
	}

	findAll() {
		return this.entityManager.find(User, {});
	}
}
