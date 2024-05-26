import { UserError } from "./user-error";

export class NotFoundError extends UserError {
	readonly _tag = "NotFoundError";

	constructor(userID: string) {
		super(`user not found: ${userID}`);
	}
}
