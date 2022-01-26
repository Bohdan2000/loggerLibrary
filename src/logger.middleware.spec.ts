import { Logger } from './logger';
import { loggerMiddleware } from './logger.middleware';

describe('/src/logger.middleware.ts', () => {
  it('should return `HttpLogger` instance', () => {
    const logger = new Logger();
    const middleware = loggerMiddleware(logger);

    expect(middleware).toBeInstanceOf(Function);
  });
});
