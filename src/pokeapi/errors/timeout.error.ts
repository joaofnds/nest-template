import { PokeAPIError } from "./pokeapi.error";

export class PokeAPITimeoutError extends PokeAPIError {
	readonly name = "PokeAPITimeoutError";
}
