import { Effect } from "effect/Effect";
import { NotFoundError } from "./errors/not-found.error";
import { RepositoryError } from "./errors/repository.error";
import { User } from "./user";

export interface UserRepository {
	persist(user: User): Effect<void, RepositoryError>;
	find(id: string): Effect<User, NotFoundError | RepositoryError>;
	findAll(): Effect<User[], RepositoryError>;
}
