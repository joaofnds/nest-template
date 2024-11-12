import { z } from "zod";

export const redisConfigSchema = z.object({
	url: z.string().startsWith("redis://").url(),
});

export class RedisConfig {
	constructor(readonly url: string) {}

	static fromPlain(config: z.infer<typeof redisConfigSchema>) {
		return new RedisConfig(config.url);
	}
}
