import { Migrator } from "@mikro-orm/migrations";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { defineConfig } from "@mikro-orm/postgresql";
import { Module } from "@nestjs/common";
import { User } from "../user/user";
import { DatabaseConfig } from "./config";
import { DatabaseModule } from "./module";

@Module({
	imports: [
		MikroOrmModule.forRootAsync({
			imports: [DatabaseModule],
			inject: [DatabaseConfig],
			useFactory: (config: DatabaseConfig) => ({
				allowGlobalContext: true,
				entities: [User],
				...defineConfig({
					clientUrl: config.uri,
					extensions: [Migrator],
				}),
			}),
		}),
	],
})
export class ORMModule {}
