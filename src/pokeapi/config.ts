import { z } from "zod";

export const pokeAPIConfigSchema = z.object({
	baseURL: z
		.string()
		.startsWith("https://")
		.url()
		.trim()
		.refine((url) => !url.endsWith("/"), {
			message: "URL must not end with a trailing slash",
		}),
});

export class PokeAPIConfig {
	constructor(readonly baseURL: string) {}

	static fromPlain(config: z.infer<typeof pokeAPIConfigSchema>) {
		return new PokeAPIConfig(config.baseURL);
	}
}
