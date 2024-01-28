import {
	ArgumentMetadata,
	BadRequestException,
	HttpStatus,
	PipeTransform,
} from "@nestjs/common";
import { ZodSchema } from "zod";

export class ZodPipe implements PipeTransform {
	transform(value: unknown, { metatype }: ArgumentMetadata) {
		if (!metatype || !(metatype instanceof ZodSchema)) {
			return value;
		}

		const parsedValue = metatype.safeParse(value);

		if (parsedValue.success) {
			return parsedValue.data;
		}

		throw new BadRequestException({
			statusCode: HttpStatus.BAD_REQUEST,
			errors: parsedValue.error.issues.map((issue) => ({
				message: issue.message,
				path: issue.path,
			})),
		});
	}
}
