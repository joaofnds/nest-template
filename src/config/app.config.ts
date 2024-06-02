import { PokeAPIConfig, pokeAPIConfigSchema } from "src/pokeapi/config";
import { z } from "zod";
import { DatabaseConfig, databaseConfigSchema } from "../database/config";
import { RedisConfig, redisConfigSchema } from "../redis/config";
import { ThrottlerConfig, throttlerConfigSchema } from "../throttler/config";

const appConfigSchema = z.object({
	throttler: throttlerConfigSchema,
	database: databaseConfigSchema,
	redis: redisConfigSchema,
	pokeAPI: pokeAPIConfigSchema,
});

export class AppConfig {
	constructor(
		readonly throttler: ThrottlerConfig,
		readonly database: DatabaseConfig,
		readonly redis: RedisConfig,
		readonly pokeAPI: PokeAPIConfig,
	) {}

	static fromPlain(config: z.infer<typeof appConfigSchema>) {
		return new AppConfig(
			ThrottlerConfig.fromPlain(config.throttler),
			DatabaseConfig.fromPlain(config.database),
			RedisConfig.fromPlain(config.redis),
			PokeAPIConfig.fromPlain(config.pokeAPI),
		);
	}

	static parse(config: unknown) {
		return AppConfig.fromPlain(appConfigSchema.parse(config));
	}
}
