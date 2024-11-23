import pino from "pino";
import { z } from "zod";

export class LoggerConfig {
	static readonly schema = z.object({
		level: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]),
		http: z.boolean(),
	});

	constructor(
		readonly level: pino.Level,
		readonly http: boolean,
	) {}

	static fromPlain(config: z.infer<typeof LoggerConfig.schema>) {
		return new LoggerConfig(config.level, config.http);
	}

	static envOverrides() {
		return {};
	}
}
