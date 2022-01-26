import { Logger } from './logger';

describe('/src/logger.ts', () => {
  let logger: Logger;
  let writeStdoutProcessSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new Logger();
    writeStdoutProcessSpy = jest.spyOn(process.stdout, 'write');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('to be instance of Logger', () => {
    expect(logger).toBeInstanceOf(Logger);
  });

  it('to have property info', () => {
    expect(logger).toHaveProperty('info');
  });

  it('to have property warn', () => {
    expect(logger).toHaveProperty('warn');
  });

  it('to have property error', () => {
    expect(logger).toHaveProperty('error');
  });

  it('to have property debug', () => {
    expect(logger).toHaveProperty('debug');
  });

  it('to have property trace', () => {
    expect(logger).toHaveProperty('trace');
  });

  it('to have property fatal', () => {
    expect(logger).toHaveProperty('fatal');
  });

  it('to log info', () => {
    logger.info('Test');
    expect(writeStdoutProcessSpy).toHaveBeenCalled();
  });

  it('to log debug', () => {
    logger.debug('Test');
    expect(writeStdoutProcessSpy).not.toBeCalled();
  });

  it('to log warn', () => {
    logger.warn('Test');
    expect(writeStdoutProcessSpy).toHaveBeenCalled();
  });

  it('to log trace', () => {
    logger.trace('Test');
    expect(writeStdoutProcessSpy).not.toBeCalled();
  });

  it('to log fatal', () => {
    logger.fatal('Test');
    expect(writeStdoutProcessSpy).toHaveBeenCalled();
  });

  it('to log fatal with error', () => {
    logger.fatal('Test', new Error('ERROR!'));
    expect(writeStdoutProcessSpy).toHaveBeenCalled();
  });

  it('to log error', () => {
    logger.error('Test');
    expect(writeStdoutProcessSpy).toHaveBeenCalled();
  });

  it('to log error with error', () => {
    logger.error('Test', new Error('ERROR!'));
    expect(writeStdoutProcessSpy).toHaveBeenCalled();
  });

  it('to call `logger.info` with object', () => {
    const infoLoggerSpy: jest.SpyInstance = jest.spyOn(logger.logger, 'info');
    logger.info('Test');
    logger.info({ test: 'Test' });

    expect(infoLoggerSpy).toBeCalledTimes(2);
    expect(infoLoggerSpy).toHaveBeenNthCalledWith(1, { msg: 'Test' });
    expect(infoLoggerSpy).toHaveBeenNthCalledWith(2, { test: 'Test' });
  });

  it('should not call `logger.info` with custom configuration', () => {
    const customLogger = new Logger({
      level: 'error',
    });
    customLogger.info('Test');
    customLogger.info({ test: 'Test' });

    expect(writeStdoutProcessSpy).toBeCalledTimes(0);
  });
});
