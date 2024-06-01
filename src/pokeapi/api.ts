import { Injectable } from "@nestjs/common";
import { PokeAPIConfig } from "./config";
import { PokeAPINotFoundError } from "./errors/not-found.error";
import { PokeAPIError } from "./errors/pokeapi.error";
import { pokemonSchema } from "./schemas/pokemon.schema";

@Injectable()
export class PokeAPI {
	constructor(private readonly config: PokeAPIConfig) {}

	getPokemon(name: string) {
		return fetch(`${this.config.baseURL}/pokemon/${name}`)
			.catch((err) => {
				throw new PokeAPIError(err.message);
			})
			.then((res) => {
				if (res.status === 404) {
					throw new PokeAPINotFoundError(name);
				}
				return res.json();
			})
			.then((data) => {
				const result = pokemonSchema.safeParse(data);
				if (result.success) {
					return result.data;
				}

				throw new PokeAPIError(
					result.error.errors.map((err) => err.message).join(", "),
				);
			});
	}
}
