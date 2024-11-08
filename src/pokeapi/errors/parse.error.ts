import { PokeAPIError } from "./pokeapi.error";

export class PokeAPIParseError extends PokeAPIError {
	readonly name = "PokeAPIParseError";
}
