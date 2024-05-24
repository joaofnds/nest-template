import { Module } from "@nestjs/common";
import { UserEventsModule } from "./events/module";
import { UserPersistenceModule } from "./persistence/module";
import { UserService } from "./user.service";

@Module({
	imports: [UserPersistenceModule, UserEventsModule],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
