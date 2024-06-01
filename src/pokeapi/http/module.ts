import { Module } from "@nestjs/common";
import { PokeAPIModule } from "../module";
import { PokeAPIController } from "./controller";

@Module({
	imports: [PokeAPIModule],
	controllers: [PokeAPIController],
})
export class PokeAPIHTTPModule {}
