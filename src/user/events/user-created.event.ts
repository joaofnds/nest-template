import { User } from "../user";

export class UserCreatedEvent {
	static readonly EventName = "user.created";

	constructor(readonly context: string, readonly user: User) {}
}
