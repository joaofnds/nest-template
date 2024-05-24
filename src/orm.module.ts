import { Migrator } from "@mikro-orm/migrations";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { defineConfig } from "@mikro-orm/postgresql";
import { Module } from "@nestjs/common";
import { ConfigModule } from "./config/config.module";
import { DatabaseConfig } from "./config/database.config";
import { User } from "./user/user";

@Module({
	imports: [
		MikroOrmModule.forRootAsync({
			imports: [ConfigModule],
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
