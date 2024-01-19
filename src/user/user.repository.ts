import { User } from "./user";

export interface UserRepository {
	persist(user: User): Promise<void>;
	find(id: string): Promise<User>;
	findAll(): Promise<User[]>;
}
