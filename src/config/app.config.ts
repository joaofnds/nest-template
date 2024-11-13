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

	static parse(config: unknown) {
		const parsedConfig = AppConfig.schema.parse(config);

		return new AppConfig(
			ThrottlerConfig.fromPlain(parsedConfig.throttler),
			DatabaseConfig.fromPlain(parsedConfig.database),
			RedisConfig.fromPlain(parsedConfig.redis),
			PokeAPIConfig.fromPlain(parsedConfig.pokeAPI),
		);
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
