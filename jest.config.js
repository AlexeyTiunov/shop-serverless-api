module.exports = {
  preset: "ts-jest",
  verbose: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "node",
  testTimeout: 20000,
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.+(ts|tsx|js)", "**/?(*.)+(spec|test).+(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts|tsx|js)$": "ts-jest",
  },
  moduleNameMapper: {
    "@libs(.*)": "<rootDir>/src/libs/$1",
    "@functions(.*)": "<rootDir>/src/functions/$1",
  },
};
