import {
	HttpClientError,
	RequestError,
	ResponseError,
} from "@effect/platform/Http/ClientError";
import * as Http from "@effect/platform/HttpClient";
import { ParseError } from "@effect/schema/ParseResult";
import { Injectable } from "@nestjs/common";
import { Console, Effect, pipe } from "effect";
import { TimeoutException } from "effect/Cause";
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
			Http.request.get(`${this.config.baseURL}/pokemon/${name}`),
			Http.client.fetch,
			Http.response.schemaBodyJsonScoped(PokemonSchema),
			Effect.timeout(this.config.timeoutMilliseconds),
			Effect.mapError((error) => {
				switch (error._tag) {
					case "TimeoutException":
						return new PokeAPITimeoutError(error.message);
					case "ParseError":
						return new PokeAPIParseError(error.message);
					case "RequestError":
						return new PokeAPIError(error.message);
					case "ResponseError":
						return error.response.status === 404
							? new PokeAPINotFoundError(error.request.url)
							: new PokeAPIError(error.message);
				}
			}),
		);
	}
}
