import { z } from "zod";

export class LoggerConfig {
	static readonly schema = z.object({
		http: z.boolean(),
	});

	constructor(readonly http: boolean) {}

	static fromPlain(config: z.infer<typeof LoggerConfig.schema>) {
		return new LoggerConfig(config.http);
	}

	static envOverrides() {
		return {};
	}
}
