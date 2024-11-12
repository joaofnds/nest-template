import { z } from "zod";

export const redisConfigSchema = z.object({
	url: z.string().startsWith("redis://").url(),
	family: z.union([z.literal(4), z.literal(6)]),
});

export class RedisConfig {
	constructor(
		readonly url: string,
		readonly family: number,
	) {}

	static fromPlain(config: z.infer<typeof redisConfigSchema>) {
		return new RedisConfig(config.url, config.family);
	}
}
