import { MikroOrmModule } from "@mikro-orm/nestjs";
import { defineConfig } from "@mikro-orm/postgresql";
import { Module } from "@nestjs/common";
import { ConfigModule, DatabaseConfig } from "src/config";
import { User } from "./user";

@Module({
	imports: [
		MikroOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [DatabaseConfig],
			useFactory: (config: DatabaseConfig) => ({
				allowGlobalContext: true,
				entities: [User],
				...defineConfig({ clientUrl: config.uri }),
			}),
		}),
	],
})
export class ORMModule {}
