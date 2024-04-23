const nextJest = require("next/jest");

const createJestConfig = nextJest({
	dir: "./",
});

/** @type {import("jest").Config} */

const config = {
	setupFilesAfterEnv: ["@testing-library/jest-dom"],
	testEnvironment: "jest-environment-jsdom",
	preset: "ts-jest",
};

module.exports = createJestConfig(config);
