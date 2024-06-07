import { PokeAPIError } from "./pokeapi.error";

export class PokeAPINotFoundError extends PokeAPIError {
	_tag = "PokeAPINotFoundError";
	constructor(readonly pokemon: string) {
		super(`pokemon "${pokemon}" not found`);
	}
}
