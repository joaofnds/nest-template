import { UserError } from "./user-error";

export class NotFoundError extends UserError {
	readonly name = "NotFoundError";

	constructor(userID: string) {
		super(`user not found: ${userID}`);
	}
}
