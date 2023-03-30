/**  @type {import('@jest/types').Config.ProjectConfig} */
const config = {
	preset: "ts-jest",
	testEnvironment: "node",
	transform: { "\\.[jt]s?$": ["ts-jest"] },
	moduleNameMapper: {
		"^(\\.{1,2}/.*)\\.[jt]s$": "$1",
	},
};

export default config;
