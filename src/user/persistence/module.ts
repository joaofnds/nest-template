import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { MikroUserRepository } from "./mikro.repository";
import { UserSchema } from "./user.schema";

@Module({
	imports: [MikroOrmModule.forFeature([UserSchema])],
	providers: [MikroUserRepository],
	exports: [MikroUserRepository],
})
export class UserPersistenceModule {}
