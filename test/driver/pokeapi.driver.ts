import { Driver } from "./driver";

export class PokeAPIDriver extends Driver {
	getByName(name: string) {
		return this.agent.get(`/pokeapi/${name}`);
	}
}
