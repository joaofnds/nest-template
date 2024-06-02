import {
	Controller,
	Get,
	InternalServerErrorException,
	NotFoundException,
	Param,
	RequestTimeoutException,
} from "@nestjs/common";
import { PokeAPI } from "../api";
import { PokeAPINotFoundError } from "../errors/not-found.error";
import { PokeAPITimeoutError } from "../errors/timeout.error";

@Controller("/pokeapi")
export class PokeAPIController {
	constructor(private readonly api: PokeAPI) {}

	@Get("/:name")
	async findUser(@Param("name") name: string) {
		try {
			return await this.api.getPokemon(name);
		} catch (error) {
			if (error instanceof PokeAPITimeoutError) {
				throw new RequestTimeoutException(error);
			}

			if (error instanceof PokeAPINotFoundError) {
				throw new NotFoundException(error);
			}

			throw new InternalServerErrorException(error);
		}
	}
}
