import { BadRequestException, HttpStatus, PipeTransform } from "@nestjs/common";
import { ZodType } from "zod";

export class ZodPipe implements PipeTransform {
	constructor(private readonly schema: ZodType) {}

	transform(value: unknown) {
		const result = this.schema.safeParse(value);

		if (result.success) {
			return result.data;
		}

		throw new BadRequestException({
			statusCode: HttpStatus.BAD_REQUEST,
			errors: result.error.issues.map((issue) => ({
				message: issue.message,
				path: issue.path,
			})),
		});
	}
}
