import { existsSync, readFileSync } from "node:fs";
import { load as loadYAML } from "js-yaml";
import { merge } from "lodash";
import { z } from "zod";
import { AppConfig } from "./app.config";

export class ConfigLoader {
	static readonly envSchema = z.object({
		CONFIG_PATH: z.string().min(5),
	});

	private readonly configPath: string;
	private readonly localConfigPath = "src/config/local.yaml";

	constructor() {
		const env = ConfigLoader.envSchema.parse(process.env);
		this.configPath = env.CONFIG_PATH;
	}

	load() {
		return merge(
			this.loadConfig(this.configPath),
			this.loadConfigIfExists(this.localConfigPath),
			AppConfig.envOverrides(),
		);
	}

	private loadConfigIfExists(path: string) {
		if (existsSync(path)) return this.loadConfig(path);
	}

	private loadConfig(path: string) {
		return loadYAML(readFileSync(path, "utf8")) as Record<string, unknown>;
	}
}
