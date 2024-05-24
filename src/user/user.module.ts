import { Module } from "@nestjs/common";
import { UserEventsModule } from "./events";
import { UserPersistenceModule } from "./persistence";
import { UserService } from "./user.service";

@Module({
	imports: [UserPersistenceModule, UserEventsModule],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
