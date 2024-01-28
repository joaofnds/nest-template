import assert from "assert";

assert.doesNotMatch(
	process.env.NODE_ENV || "",
	/prod/i,
	"test files should not be imported in production",
);
