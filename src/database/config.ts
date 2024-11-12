import { z } from "zod";

export const databaseConfigSchema = z.object({
	url: z.string().startsWith("postgres://").url(),
});

export class DatabaseConfig {
	constructor(readonly url: string) {}

	static fromPlain(config: z.infer<typeof databaseConfigSchema>) {
		return new DatabaseConfig(config.url);
	}
}
