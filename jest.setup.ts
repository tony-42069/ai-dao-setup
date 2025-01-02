import { jest } from '@jest/globals';

// Global mocks and setup
jest.setTimeout(10000); // Increase timeout for integration tests

// Mock Slack WebClient
jest.mock('@slack/web-api', () => ({
  WebClient: jest.fn().mockImplementation(() => ({
    chat: {
      postMessage: jest.fn().mockImplementation(() => Promise.resolve({ ok: true }))
    }
  }))
}));
