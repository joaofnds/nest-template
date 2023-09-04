import { Config } from "jest";

const config: Config = {
	collectCoverageFrom: ["src/**/*.ts"],
	coverageDirectory: "coverage",
	coveragePathIgnorePatterns: [
		"node_modules/",
		"dist/",
		"test/",
		"src/main.ts",
		"src/migration.ts",
		"src/migrations",
		".module.ts",
		".test.ts",
	],
	detectOpenHandles: true,
	forceExit: true,
	rootDir: "./",
	testEnvironment: "node",
	testMatch: ["<rootDir>/src/**/*.test.ts"],
	transform: {
		"^.+\\.(t|j)s$": "ts-jest",
	},
	moduleNameMapper: {
		"^src/(.*)": "<rootDir>/src/$1",
		"^test/(.*)": "<rootDir>/test/$1",
	},
};

export default config;
