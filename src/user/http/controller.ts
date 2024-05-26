import {
	Body,
	Controller,
	Get,
	InternalServerErrorException,
	NotFoundException,
	Param,
	ParseUUIDPipe,
	Post,
	UseInterceptors,
	UsePipes,
} from "@nestjs/common";
import { Effect } from "effect";
import { ZodPipe } from "src/common/zod.pipe";
import { EffectInterceptor } from "src/nest/effect.interceptor";
import { NotFoundError } from "../errors/not-found.error";
import { RepositoryError } from "../errors/repository.error";
import { UserService } from "../user.service";
import { createUserSchema } from "./schema/create-user.schema";

@Controller("/users")
@UsePipes(new ZodPipe())
@UseInterceptors(new EffectInterceptor())
export class UserController {
	constructor(private readonly service: UserService) {}

	@Post()
	createUser(@Body() { name }: createUserSchema) {
		return this.service.create(name).pipe(this.mapError);
	}

	@Get("/:id")
	findUser(@Param("id", new ParseUUIDPipe()) id: string) {
		return this.service.find(id).pipe(this.mapError);
	}

	@Get()
	listUsers() {
		return this.service.all().pipe(this.mapError);
	}

	private mapError = Effect.mapError(
		(error: NotFoundError | RepositoryError) => {
			switch (error._tag) {
				case "NotFoundError":
					return new NotFoundException(error.message);
				case "RepositoryError":
					return new InternalServerErrorException(error.message);
			}
		},
	);
}
