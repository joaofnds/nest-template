import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { User } from "../user";
import { MikroRepository } from "./mikro.repository";

@Module({
	imports: [MikroOrmModule.forFeature([User])],
	providers: [MikroRepository],
	exports: [MikroRepository],
})
export class UserPersistenceModule {}
