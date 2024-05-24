import { MikroORM } from "@mikro-orm/core";
import { Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { Command, InvalidArgumentError } from "commander";
import { ORMModule } from "./database/orm";

@Module({ imports: [ORMModule] })
class Migration {}

async function withORM(f: (orm: MikroORM) => unknown) {
	const app = await NestFactory.createApplicationContext(Migration, {
		logger: false,
	});
	const orm = await app.resolve(MikroORM);
	await f(orm);
	await orm.close();
	await app.close();
}

function parseInteger(value: string) {
	const parsedValue = Number.parseInt(value, 10);
	if (Number.isNaN(parsedValue)) {
		throw new InvalidArgumentError("Not a number.");
	}
	return parsedValue;
}

type MigratorOptions = { name?: string; to?: number };

function parseOptions(options: MigratorOptions) {
	if (options.name !== undefined) return options.name;
	if (options.to !== undefined) return { to: options.to };
	return undefined;
}

const program = new Command();

program
	.name("migrate")
	.description("run Mikro-ORM migrations")
	.version("0.0.1");

program
	.command("up")
	.option("-n, --name [migration]", "runs only given migration, up")
	.option(
		"-t, --to [migration]",
		"runs migrations up to given version",
		parseInteger,
	)
	.action(async (opt: MigratorOptions) => {
		await withORM(async (o) => await o.getMigrator().up(parseOptions(opt)));
	});

program
	.command("down")
	.option("-n, --name [migration]", "runs only given migration, up")
	.option(
		"-t, --to [migration]",
		"runs migrations up to given version",
		parseInteger,
	)
	.action(async (opt) => {
		await withORM(async (o) => await o.getMigrator().down(parseOptions(opt)));
	});

program.command("check").action(async () => {
	await withORM(async (o) =>
		console.log(
			"migration needed?",
			await o.getMigrator().checkMigrationNeeded(),
		),
	);
});

program
	.command("create")
	.argument("<name>", "name of the migration")
	.action((name) =>
		withORM((o) =>
			o.getMigrator().createMigration("./src/migrations", true, false, name),
		),
	);

program.parse();
