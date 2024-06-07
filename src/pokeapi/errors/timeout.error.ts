import { PokeAPIError } from "./pokeapi.error";

export class PokeAPITimeoutError extends PokeAPIError {
	_tag = "PokeAPITimeoutError";
}
