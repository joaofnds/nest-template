export class PokeAPIError extends Error {
	constructor(readonly message: string) {
		super(message);
		this.name = "PokeAPIError";
	}
}
