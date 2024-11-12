import { PokeAPIConfig } from "src/pokeapi/config";
import { z } from "zod";
import { DatabaseConfig } from "../database/config";
import { RedisConfig } from "../redis/config";
import { ThrottlerConfig } from "../throttler/config";

export class AppConfig {
	static readonly schema = z.object({
		throttler: ThrottlerConfig.schema,
		database: DatabaseConfig.schema,
		redis: RedisConfig.schema,
		pokeAPI: PokeAPIConfig.schema,
	});

	constructor(
		readonly throttler: ThrottlerConfig,
		readonly database: DatabaseConfig,
		readonly redis: RedisConfig,
		readonly pokeAPI: PokeAPIConfig,
	) {}

	static fromPlain(config: z.infer<typeof AppConfig.schema>) {
		return new AppConfig(
			ThrottlerConfig.fromPlain(config.throttler),
			DatabaseConfig.fromPlain(config.database),
			RedisConfig.fromPlain(config.redis),
			PokeAPIConfig.fromPlain(config.pokeAPI),
		);
	}

	static parse(config: unknown) {
		return AppConfig.fromPlain(AppConfig.schema.parse(config));
	}

	static envOverrides() {
		return {
			throttler: ThrottlerConfig.envOverrides(),
			database: DatabaseConfig.envOverrides(),
			redis: RedisConfig.envOverrides(),
			pokeAPI: PokeAPIConfig.envOverrides(),
		};
	}
}
