import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { UserEventsModule } from "./events";
import { MikroRepository } from "./mikro.repository";
import { User } from "./user";
import { UserService } from "./user.service";

@Module({
	imports: [MikroOrmModule.forFeature([User]), UserEventsModule],
	providers: [MikroRepository, UserService],
	exports: [UserService],
})
export class UserModule {}
