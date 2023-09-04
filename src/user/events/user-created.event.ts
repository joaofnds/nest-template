import { User } from "../user.entity";

export class UserCreatedEvent {
	static readonly EventName = "user.created";

	constructor(readonly context: string, readonly user: User) {}
}
