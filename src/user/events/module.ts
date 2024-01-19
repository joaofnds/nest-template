import { Module } from "@nestjs/common";
import { UserEmitter } from "./user-emitter";

@Module({
	providers: [UserEmitter],
	exports: [UserEmitter],
})
export class UserEventsModule {}
