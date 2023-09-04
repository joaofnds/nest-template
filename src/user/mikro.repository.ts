import { DriverException, NotFoundError } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { NotFoundError as UserNotFoundError, RepositoryError } from "./errors";
import { User } from "./user.entity";
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
			if (
				error instanceof DriverException &&
				error.message.includes("invalid input syntax for type uuid")
			) {
				throw new RepositoryError(`invalid uuid: ${id}`);
			}
		}
	}

	findAll() {
		return this.entityManager.find(User, {});
	}
}
