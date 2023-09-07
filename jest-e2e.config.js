const baseConfig = require("./jest.config");

module.exports = {
	...baseConfig,
	coverageDirectory: "coverage-e2e",
	testMatch: ["<rootDir>/test/e2e/*.test.ts"],
};
