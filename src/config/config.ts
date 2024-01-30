import { z } from "zod";

const databaseConfigSchema = z.object({
	uri: z.string().startsWith("postgres://").url(),
});

export class DatabaseConfig {
	constructor(readonly uri: string) {}

	static fromPlain(config: z.infer<typeof databaseConfigSchema>) {
		return new DatabaseConfig(config.uri);
	}
}

const redisConfigSchema = z.object({
	uri: z.string().startsWith("redis://").url(),
});

export class RedisConfig {
	constructor(readonly uri: string) {}

	static fromPlain(config: z.infer<typeof redisConfigSchema>) {
		return new RedisConfig(config.uri);
	}
}

const appConfigSchema = z.object({
	database: databaseConfigSchema,
	redis: redisConfigSchema,
});

export class AppConfig {
	constructor(
		readonly database: DatabaseConfig,
		readonly redis: RedisConfig,
	) {}

	static fromPlain(config: z.infer<typeof appConfigSchema>) {
		return new AppConfig(
			DatabaseConfig.fromPlain(config.database),
			RedisConfig.fromPlain(config.redis),
		);
	}

	static parse(config: unknown) {
		return AppConfig.fromPlain(appConfigSchema.parse(config));
	}
}
