import { PokeAPIError } from "./pokeapi.error";

export class PokeAPIParseError extends PokeAPIError {
	_tag = "PokeAPIParseError";
}
