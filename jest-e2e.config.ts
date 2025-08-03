import type { Config } from "jest";
import baseConfig from "./jest.config.ts";

export default {
	...baseConfig,
	coverageDirectory: "coverage-e2e",
	testMatch: ["<rootDir>/test/e2e/*.test.ts"],
} satisfies Config;
