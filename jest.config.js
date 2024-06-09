module.exports = {
	setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
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
		"^.+\\.(t|j)s$": "@swc/jest",
	},
	moduleNameMapper: {
		"^src/(.*)": "<rootDir>/src/$1",
		"^test/(.*)": "<rootDir>/test/$1",
	},
};
