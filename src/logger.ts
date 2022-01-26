import pino, { Logger as PinoLogger } from 'pino';

import { LoggerDefaultConfig } from './logger.config.default';
import { LoggerConfig, Message } from './logger.definition';

export class Logger {
  readonly logger: PinoLogger;
  private readonly config: LoggerConfig;

  constructor(customConfig?: LoggerConfig) {
    const defaultConfig = new LoggerDefaultConfig();
    this.config = customConfig ? { ...defaultConfig, ...customConfig } : defaultConfig;
    this.logger = pino(this.config);
  }

  public trace(message: Message): void {
    this.logger.trace(this.messageToObject(message));
  }

  public debug(message: Message): void {
    this.logger.debug(this.messageToObject(message));
  }

  public info(message: Message): void {
    this.logger.info(this.messageToObject(message));
  }

  public warn(message: Message): void {
    this.logger.warn(this.messageToObject(message));
  }

  public error(message: string, error?: Error): void {
    if (!error) {
      return this.logger.error(message);
    }
    this.logger.error(error, message);
  }

  public fatal(message: string, error?: Error): void {
    if (!error) {
      return this.logger.fatal(message);
    }
    return this.logger.fatal(error, message);
  }

  private messageToObject(message: Message): object {
    return typeof message === 'string' ? { msg: message } : message;
  }
}
