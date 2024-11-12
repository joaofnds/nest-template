import { z } from "zod";

export const throttlerConfigSchema = z.object({
	ttl: z.number().positive(),
	limit: z.number().positive(),
});

export class ThrottlerConfig {
	constructor(
		readonly ttl: number,
		readonly limit: number,
	) {}

	static fromPlain(config: z.infer<typeof throttlerConfigSchema>) {
		return new ThrottlerConfig(config.ttl, config.limit);
	}

	static envOverrides() {
		return {};
	}
}
