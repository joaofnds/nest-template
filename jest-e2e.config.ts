import { Config } from "jest";
import baseConfig from "./jest.config";

const config: Config = {
	...baseConfig,
	coverageDirectory: "coverage-e2e",
	testMatch: ["<rootDir>/test/e2e/*.test.ts"],
};

export default config;
