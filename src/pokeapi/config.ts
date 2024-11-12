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
	timeoutMilliseconds: z.number().int().gte(100).lte(10_000),
});

export class PokeAPIConfig {
	constructor(
		readonly baseURL: string,
		readonly timeoutMilliseconds: number,
	) {}

	static fromPlain(config: z.infer<typeof pokeAPIConfigSchema>) {
		return new PokeAPIConfig(config.baseURL, config.timeoutMilliseconds);
	}

	static envOverrides() {
		return {};
	}
}
