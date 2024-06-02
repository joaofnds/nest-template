import { Injectable } from "@nestjs/common";
import { zodErrorToString } from "src/zod";
import { PokeAPIConfig } from "./config";
import { PokeAPINotFoundError } from "./errors/not-found.error";
import { PokeAPIError } from "./errors/pokeapi.error";
import { PokeAPITimeoutError } from "./errors/timeout.error";
import { pokemonSchema } from "./schemas/pokemon.schema";

@Injectable()
export class PokeAPI {
	constructor(private readonly config: PokeAPIConfig) {}

	getPokemon(name: string) {
		return fetch(`${this.config.baseURL}/pokemon/${name}`, {
			signal: AbortSignal.timeout(this.config.timeoutMilliseconds),
		})
			.catch((err) => {
				if (err?.name === "TimeoutError") {
					throw new PokeAPITimeoutError("Request timed out");
				}

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

				throw new PokeAPIError(zodErrorToString(result.error));
			});
	}
}
