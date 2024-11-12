import { z } from "zod";

export class DatabaseConfig {
	static readonly schema = z.object({
		url: z.string().startsWith("postgres://").url(),
	});

	constructor(readonly url: string) {}

	static fromPlain(config: z.infer<typeof DatabaseConfig.schema>) {
		return new DatabaseConfig(config.url);
	}

	static envOverrides() {
		return { url: process.env.DATABASE_URL };
	}
}
