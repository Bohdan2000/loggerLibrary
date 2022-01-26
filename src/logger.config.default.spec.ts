import { LoggerDefaultConfig } from './logger.config.default';

describe('/src/logger.config.default.ts', () => {
  let config: LoggerDefaultConfig;
  beforeEach(() => {
    config = new LoggerDefaultConfig();
  });

  test('should be `level` property of `LoggerDefaultConfig` instance', () => {
    expect(config).toHaveProperty('level');
  });

  test('should be `timestamp` property of `LoggerDefaultConfig` instance', () => {
    expect(config).toHaveProperty('timestamp');
  });
});
