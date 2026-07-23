import {
	Body,
	Controller,
	Get,
	Param,
	ParseUUIDPipe,
	Post,
} from "@nestjs/common";
import { ZodPipe } from "src/common/zod.pipe";
import { UserService } from "../user.service";
import { type CreateUser, CreateUserSchema } from "./schema/create-user.schema";

@Controller("/users")
export class UserController {
	constructor(private readonly service: UserService) {}

	@Post()
	async createUser(@Body(new ZodPipe(CreateUserSchema)) { name }: CreateUser) {
		return await this.service.create(name);
	}

	@Get("/:id")
	async findUser(@Param("id", new ParseUUIDPipe()) id: string) {
		return await this.service.find(id);
	}

	@Get()
	async listUsers() {
		return await this.service.all();
	}
}
