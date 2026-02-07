import { Module } from "@nestjs/common";
import { AppConfig } from "src/config/app.config";
import { AppConfigModule } from "src/config/config.module";
import { FetchService } from "src/lib/http/fetch.service";
import { HTTPModule } from "src/lib/http/module";
import { PokeAPI } from "./api";
import { PokeAPIConfig } from "./config";

@Module({
	imports: [AppConfigModule, HTTPModule],
	providers: [
		{
			provide: PokeAPIConfig,
			inject: [AppConfig],
			useFactory: (config: AppConfig) => config.pokeAPI,
		},
		{
			provide: PokeAPI,
			inject: [PokeAPIConfig, FetchService],
			useFactory: (config: PokeAPIConfig, http: FetchService) =>
				new PokeAPI(config, http),
		},
	],
	exports: [PokeAPI],
})
export class PokeAPIModule {}
