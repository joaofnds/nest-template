import {
	Body,
	Controller,
	Get,
	Param,
	ParseUUIDPipe,
	Post,
	UsePipes,
} from "@nestjs/common";
import { ZodPipe } from "src/common";
import { User } from "../user";
import { UserService } from "../user.service";
import { createUserSchema } from "./schema";

@Controller("/users")
@UsePipes(new ZodPipe())
export class UserController {
	constructor(private readonly service: UserService) {}

	@Post()
	async createUser(@Body() { name }: createUserSchema): Promise<User> {
		return await this.service.create(name);
	}

	@Get("/:id")
	findUser(@Param("id", new ParseUUIDPipe()) id: string): Promise<User> {
		return this.service.find(id);
	}

	@Get()
	async listUsers(): Promise<User[]> {
		return await this.service.all();
	}
}
