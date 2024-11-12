import { z } from "zod";

export class ThrottlerConfig {
	static readonly schema = z.object({
		ttl: z.number().positive(),
		limit: z.number().positive(),
	});

	constructor(
		readonly ttl: number,
		readonly limit: number,
	) {}

	static fromPlain(config: z.infer<typeof ThrottlerConfig.schema>) {
		return new ThrottlerConfig(config.ttl, config.limit);
	}

	static envOverrides() {
		return {};
	}
}
