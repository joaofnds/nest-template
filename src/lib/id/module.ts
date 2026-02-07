import { Module } from "@nestjs/common";
import { UUIDService } from "./uuid.service";

@Module({
	providers: [UUIDService],
	exports: [UUIDService],
})
export class IDModule {}
