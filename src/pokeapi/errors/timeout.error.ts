import { PokeAPIError } from "./pokeapi.error";

export class PokeAPITimeoutError extends PokeAPIError {
	constructor(message: string) {
		super(message);
		this.name = "PokeAPITimeoutError";
	}
}
