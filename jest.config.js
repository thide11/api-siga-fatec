module.exports = {
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	testMatch: [
		"**.test.ts"
	],
	testPathIgnorePatterns: ['lib/', 'node_modules/'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	testEnvironment: 'node',
	modulePathIgnorePatterns: ["<rootDir>/app/__tests__/infrastructure/fixtures/*"],
	rootDir: 'app',
}