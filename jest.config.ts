module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // Exit the test suite immediately upon the first failing test suite
  bail: true,
  // Each individual test should be reported during the run
  verbose: true,
  setupFilesAfterEnv: [
    'jest-extended'
  ],
  reporters: [
    'default',
    'jest-junit',
  ],
  collectCoverageFrom: [
    '**/*.{ts}',
    '!**/node_modules/**'
  ],
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
  testMatch: [
    '<rootDir>/tests/**/?(*.)+(spec|test).ts?(x)'
  ],
  globals: {
    'ts-jest': {
      isolatedModules: true,
      "tsConfigFile": "tsconfig.json"
    },
  },
};
