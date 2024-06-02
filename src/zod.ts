import { ZodError } from "zod";

export function zodErrorToString(error: ZodError): string {
	return error.errors
		.map((err) => `${err.path.join(".")}: ${err.message}`)
		.join(", ");
}
