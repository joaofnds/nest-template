import { existsSync, readFileSync } from "node:fs";
import { load as loadYAML } from "js-yaml";
import { merge } from "lodash";
import { AppConfig } from "./app.config";

export class ConfigLoader {
	private readonly defaultEnv = "development";
	private readonly env = process.env.NODE_ENV || this.defaultEnv;
	private readonly envConfigPath = this.configPath(this.env);
	private readonly localConfigPath = this.configPath("local");

	constructor() {
		if (!existsSync(this.envConfigPath)) {
			throw new Error(`config file missing: ${this.envConfigPath}`);
		}
	}

	static load() {
		return new ConfigLoader().load();
	}

	load() {
		return merge(
			this.config(),
			this.localOverrides(),
			AppConfig.envOverrides(),
		);
	}

	private config() {
		return this.loadConfig(this.envConfigPath);
	}

	private localOverrides() {
		if (!existsSync(this.localConfigPath)) return {};

		return this.loadConfig(this.localConfigPath);
	}

	private configPath(name: string) {
		return `src/config/${name}.yaml`;
	}

	private loadConfig(path: string) {
		return loadYAML(readFileSync(path, "utf8")) as Record<string, unknown>;
	}
}
