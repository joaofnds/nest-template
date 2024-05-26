import { UserError } from "./user-error";

export class RepositoryError extends UserError {
	readonly _tag = "RepositoryError";
}
