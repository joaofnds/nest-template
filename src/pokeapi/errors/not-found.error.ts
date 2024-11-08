import { PokeAPIError } from "./pokeapi.error";

export class PokeAPINotFoundError extends PokeAPIError {
	readonly name = "PokeAPINotFoundError";

	constructor(readonly pokemon: string) {
		super(`pokemon "${pokemon}" not found`);
	}
}
