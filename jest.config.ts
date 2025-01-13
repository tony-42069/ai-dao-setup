import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleNameMapper: {
    '^@agents/(.*)$': '<rootDir>/packages/agents/$1',
    '^@governance/(.*)$': '<rootDir>/packages/governance/$1',
    '^@slack-integration/(.*)$': '<rootDir>/packages/slack-integration/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  verbose: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/',
    '/dist/'
  ]
};

export default config;
