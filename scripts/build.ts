import { $, build } from "bun";

await $`rm -rf dist`;

const result = await build({
	entrypoints: ["src/main.ts", "src/migration.ts"],
	outdir: "dist",
	target: "bun",
	format: "cjs", // bull board doesn't support ESM yet
	minify: true,
	external: [
		"@nestjs/microservices",
		"@nestjs/mongoose",
		"@nestjs/sequelize",
		"@nestjs/typeorm",
		"@nestjs/websockets",
		"better-sqlite3",
		"class-transformer",
		"class-validator",
		"libsql",
		"mariadb",
		"mysql",
		"mysql2",
		"oracledb",
		"pg-query-stream",
		"sqlite3",
		"tedious",
	],
});

if (!result.success) {
	console.log(result.logs[0]);
	process.exit(1);
}

console.log("Built successfully!");
