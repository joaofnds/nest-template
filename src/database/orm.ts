import { MikroORM } from "@mikro-orm/core";
import { Migrator } from "@mikro-orm/migrations";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { defineConfig, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Module, type OnApplicationBootstrap } from "@nestjs/common";
import { UserSchema } from "../user/persistence/user.schema";
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
				entities: [UserSchema],
				...defineConfig({
					clientUrl: config.url,
					extensions: [Migrator],
					migrations: { snapshot: false },
				}),
			}),
		}),
	],
})
export class ORMModule implements OnApplicationBootstrap {
	constructor(private readonly orm: MikroORM) {}

	async onApplicationBootstrap() {
		const alreadyConnected = await this.orm.isConnected();
		if (!alreadyConnected) {
			await this.orm.connect();
		}
	}
}
