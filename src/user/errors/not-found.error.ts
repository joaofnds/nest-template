import { UserError } from "./user-error";

export class NotFoundError extends UserError {
	constructor(userID: string) {
		super(`user not found: ${userID}`);
	}
}
