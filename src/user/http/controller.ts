import {
	Body,
	Controller,
	Get,
	Param,
	ParseUUIDPipe,
	Post,
	UsePipes,
} from "@nestjs/common";
import { ZodPipe } from "src/common/zod.pipe";
import { UserService } from "../user.service";
import { createUserSchema } from "./schema/create-user.schema";

@Controller("/users")
@UsePipes(new ZodPipe())
export class UserController {
	constructor(private readonly service: UserService) {}

	@Post()
	async createUser(@Body() { name }: createUserSchema) {
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
