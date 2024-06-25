import {
	HttpClient,
	HttpClientRequest,
	HttpClientResponse,
} from "@effect/platform";
import { Injectable } from "@nestjs/common";
import { Effect, Match, pipe } from "effect";
import { PokeAPIConfig } from "./config";
import { PokeAPINotFoundError } from "./errors/not-found.error";
import { PokeAPIParseError } from "./errors/parse.error";
import { PokeAPIError } from "./errors/pokeapi.error";
import { PokeAPITimeoutError } from "./errors/timeout.error";
import { PokemonSchema } from "./schemas/pokemon.schema";

@Injectable()
export class PokeAPI {
	constructor(private readonly config: PokeAPIConfig) {}

	getPokemon(name: string) {
		return pipe(
			HttpClientRequest.get(`${this.config.baseURL}/pokemon/${name}`),
			HttpClient.fetch,
			HttpClientResponse.schemaBodyJsonScoped(PokemonSchema),
			Effect.timeout(this.config.timeoutMilliseconds),
			Effect.catchTags({
				TimeoutException: (error) =>
					Effect.fail(new PokeAPITimeoutError(error.message)),
				ParseError: (error) =>
					Effect.fail(new PokeAPIParseError(error.message)),
				RequestError: (error) => Effect.fail(new PokeAPIError(error.message)),
				ResponseError: (error) =>
					pipe(
						Match.value(error.response.status),
						Match.when(404, () => new PokeAPINotFoundError(name)),
						Match.orElse(() => new PokeAPIError(error.message)),
						Effect.fail,
					),
			}),
		);
	}
}
