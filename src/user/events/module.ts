import { Module } from "@nestjs/common";
import { EventEmitterModule } from "src/event-emitter/module";
import { UserEmitter } from "./user-emitter";

@Module({
	imports: [EventEmitterModule],
	providers: [UserEmitter],
	exports: [UserEmitter],
})
export class UserEventsModule {}
