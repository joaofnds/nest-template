import { PokeAPIError } from "./pokeapi.error";

export class PokeAPINotFoundError extends PokeAPIError {
	constructor(readonly pokemon: string) {
		super(`pokemon "${pokemon}" not found`);
		this.name = "PokeAPINotFoundError";
	}
}
