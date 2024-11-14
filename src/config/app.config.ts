import { LoggerConfig } from "src/logger/logger.config";
import { PokeAPIConfig } from "src/pokeapi/config";
import { z } from "zod";
import { DatabaseConfig } from "../database/config";
import { RedisConfig } from "../redis/config";
import { ThrottlerConfig } from "../throttler/config";

export class AppConfig {
	static readonly schema = z.object({
		logger: LoggerConfig.schema,
		throttler: ThrottlerConfig.schema,
		database: DatabaseConfig.schema,
		redis: RedisConfig.schema,
		pokeAPI: PokeAPIConfig.schema,
	});

	constructor(
		readonly logger: LoggerConfig,
		readonly throttler: ThrottlerConfig,
		readonly database: DatabaseConfig,
		readonly redis: RedisConfig,
		readonly pokeAPI: PokeAPIConfig,
	) {}

	static parse(config: unknown) {
		const parsedConfig = AppConfig.schema.parse(config);

		return new AppConfig(
			LoggerConfig.fromPlain(parsedConfig.logger),
			ThrottlerConfig.fromPlain(parsedConfig.throttler),
			DatabaseConfig.fromPlain(parsedConfig.database),
			RedisConfig.fromPlain(parsedConfig.redis),
			PokeAPIConfig.fromPlain(parsedConfig.pokeAPI),
		);
	}

	static envOverrides() {
		return {
			logger: LoggerConfig.envOverrides(),
			throttler: ThrottlerConfig.envOverrides(),
			database: DatabaseConfig.envOverrides(),
			redis: RedisConfig.envOverrides(),
			pokeAPI: PokeAPIConfig.envOverrides(),
		};
	}
}
