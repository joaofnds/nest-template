import { z } from "zod";

export class PokeAPIConfig {
	static readonly schema = z.object({
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

	constructor(
		readonly baseURL: string,
		readonly timeoutMilliseconds: number,
	) {}

	static fromPlain(config: z.infer<typeof PokeAPIConfig.schema>) {
		return new PokeAPIConfig(config.baseURL, config.timeoutMilliseconds);
	}

	static envOverrides() {
		return {};
	}
}
