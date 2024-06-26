import { Module } from "@nestjs/common";
import { RandomService } from "./service";

@Module({
	providers: [RandomService],
	exports: [RandomService],
})
export class RandomModule {}
