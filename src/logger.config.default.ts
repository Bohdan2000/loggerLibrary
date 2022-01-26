import { LoggerOptions, stdTimeFunctions, TimeFn } from 'pino';

import { LOGGER_LEVELS } from './logger.definition';

export class LoggerDefaultConfig implements LoggerOptions {
  public level: string = LOGGER_LEVELS.INFO;
  public timestamp: TimeFn = stdTimeFunctions.isoTime;
}
