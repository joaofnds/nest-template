import { z } from "zod";
import { DatabaseConfig, databaseConfigSchema } from "./database.config";
import { RedisConfig, redisConfigSchema } from "./redis.config";

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
