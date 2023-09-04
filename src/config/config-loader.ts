import { existsSync, readFileSync } from "fs";
import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import { load as loadYAML } from "js-yaml";
import { merge } from "lodash";
import { AppConfig } from "./config";

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

	load(): AppConfig {
		return this.validate(merge(this.config(), this.localOverrides()));
	}

	private config() {
		return this.loadConfig(this.envConfigPath);
	}

	private localOverrides() {
		if (!existsSync(this.localConfigPath)) return {};

		return this.loadConfig(this.localConfigPath);
	}

	private configPath(name: string) {
		return `src/config/${name}.yml`;
	}

	private loadConfig(path: string) {
		return loadYAML(readFileSync(path, "utf8")) as Record<string, unknown>;
	}

	private validate(config: Record<string, unknown>) {
		const appConfig = plainToInstance(AppConfig, config, {
			enableImplicitConversion: true,
		});

		const errors = validateSync(appConfig, {
			skipMissingProperties: false,
		});

		if (errors.length > 0) throw new Error(errors.toString());

		return appConfig;
	}
}
