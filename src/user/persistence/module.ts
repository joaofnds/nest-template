import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { User } from "../user";
import { MikroUserRepository } from "./mikro.repository";

@Module({
	imports: [MikroOrmModule.forFeature([User])],
	providers: [MikroUserRepository],
	exports: [MikroUserRepository],
})
export class UserPersistenceModule {}
