import { Module } from "@nestjs/common";
import { AppConfig } from "src/config/app.config";
import { ConfigModule } from "src/config/config.module";
import { PokeAPI } from "./api";
import { PokeAPIConfig } from "./config";

@Module({
	imports: [ConfigModule],
	providers: [
		{
			provide: PokeAPIConfig,
			inject: [AppConfig],
			useFactory: (config: AppConfig) => config.pokeAPI,
		},
		PokeAPI,
	],
	exports: [PokeAPI],
})
export class PokeAPIModule {}
