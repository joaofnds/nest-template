import { z } from "zod";

export const databaseConfigSchema = z.object({
	uri: z.string().startsWith("postgres://").url(),
});

export class DatabaseConfig {
	constructor(readonly uri: string) {}

	static fromPlain(config: z.infer<typeof databaseConfigSchema>) {
		return new DatabaseConfig(config.uri);
	}
}
