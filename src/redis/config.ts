import { z } from "zod";

export const redisConfigSchema = z.object({
	uri: z.string().startsWith("redis://").url(),
});

export class RedisConfig {
	constructor(readonly uri: string) {}

	static fromPlain(config: z.infer<typeof redisConfigSchema>) {
		return new RedisConfig(config.uri);
	}
}
