import {
	EntityManager,
	NotFoundError as MikroNotFoundError,
} from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { NotFoundError } from "../errors/not-found.error";
import { RepositoryError } from "../errors/repository.error";
import { User } from "../user";
import type { UserRepository } from "../user.repository";

@Injectable()
export class MikroUserRepository implements UserRepository {
	constructor(private readonly entityManager: EntityManager) {}

	async persist(user: User): Promise<void> {
		try {
			await this.entityManager.persistAndFlush(user);
		} catch (error) {
			throw new RepositoryError(`unknown error: ${error}`);
		}
	}

	async find(id: string): Promise<User> {
		try {
			return await this.entityManager.findOneOrFail(User, { id });
		} catch (error) {
			throw error instanceof MikroNotFoundError
				? new NotFoundError(id)
				: new RepositoryError(`unknown error: ${error}`);
		}
	}

	async findAll(): Promise<User[]> {
		try {
			return await this.entityManager.find(User, {});
		} catch (error) {
			throw new RepositoryError(`unknown error: ${error}`);
		}
	}
}
