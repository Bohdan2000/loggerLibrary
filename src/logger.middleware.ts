import pino from 'express-pino-logger';

import { Logger } from './logger';

export type HttpLogger = pino.HttpLogger;

export function loggerMiddleware({ logger }: Logger): HttpLogger {
  return pino({
    logger,
  });
}
