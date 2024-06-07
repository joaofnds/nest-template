import {
	Controller,
	Get,
	InternalServerErrorException,
	NotFoundException,
	Param,
	RequestTimeoutException,
	UseInterceptors,
} from "@nestjs/common";
import { Effect } from "effect";
import { EffectInterceptor } from "src/nest/effect.interceptor";
import { PokeAPI } from "../api";

@Controller("/pokeapi")
@UseInterceptors(new EffectInterceptor())
export class PokeAPIController {
	constructor(private readonly api: PokeAPI) {}

	@Get("/:name")
	async findUser(@Param("name") name: string) {
		return this.api.getPokemon(name).pipe(
			Effect.mapError((error) => {
				switch (error._tag) {
					case "PokeAPITimeoutError":
						return new RequestTimeoutException();
					case "PokeAPINotFoundError":
						return new NotFoundException(error.message);
					case "PokeAPIParseError":
					case "PokeAPIError":
						return new InternalServerErrorException(error.message);
				}
			}),
		);
	}
}
