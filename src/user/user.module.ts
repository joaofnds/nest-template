import { Module } from "@nestjs/common";
import { RandomModule } from "src/random/module";
import { UserEventsModule } from "./events/module";
import { UserPersistenceModule } from "./persistence/module";
import { UserService } from "./user.service";

@Module({
	imports: [UserPersistenceModule, UserEventsModule, RandomModule],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
