import { Migrator } from "@mikro-orm/migrations";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { defineConfig, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Module } from "@nestjs/common";
import { User } from "../user/user";
import { DatabaseConfig } from "./config";
import { DatabaseModule } from "./module";

@Module({
	imports: [
		MikroOrmModule.forRootAsync({
			imports: [DatabaseModule],
			inject: [DatabaseConfig],
			driver: PostgreSqlDriver,
			useFactory: (config: DatabaseConfig) => ({
				allowGlobalContext: true,
				entities: [User],
				...defineConfig({
					clientUrl: config.url,
					extensions: [Migrator],
				}),
			}),
		}),
	],
})
export class ORMModule {}
