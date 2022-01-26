import { LoggerOptions as PinoLoggerOptions } from 'pino';

export enum LOGGER_LEVELS {
  TRACE = 'trace',
  DEBUG = 'debug',
  INFO = 'info',
  WARNING = 'warn',
  ERROR = 'error',
  FATAL = 'fatal',
}

export type Message = string | object;

export type LoggerConfig = PinoLoggerOptions;
