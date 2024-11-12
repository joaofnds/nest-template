import { z } from "zod";

export class RedisConfig {
	static readonly schema = z.object({
		url: z.string().startsWith("redis://").url(),
		family: z.union([z.literal(4), z.literal(6)]),
	});

	constructor(
		readonly url: string,
		readonly family: number,
	) {}

	static fromPlain(config: z.infer<typeof RedisConfig.schema>) {
		return new RedisConfig(config.url, config.family);
	}

	static envOverrides() {
		return { url: process.env.REDIS_URL };
	}
}
