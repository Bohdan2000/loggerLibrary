import { LogClass } from './log-class.decorator';
import { Logger } from './logger';

describe('/src/log-class.decorator.ts', () => {
  let infoLoggerSpy: jest.SpyInstance;
  let warnLoggerSpy: jest.SpyInstance;
  beforeEach(() => {
    infoLoggerSpy = jest.spyOn(Logger.prototype, 'info').mockImplementation();
    warnLoggerSpy = jest.spyOn(Logger.prototype, 'warn').mockImplementation();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call `info` method of instance `Logger` for sync method of class', () => {
    @LogClass()
    class TestClass {
      public myMethod(a: string): string {
        return a;
      }
    }
    const testInstance = new TestClass();
    testInstance.myMethod('test-str');

    expect(infoLoggerSpy).toBeCalledTimes(2);
    expect(infoLoggerSpy).toHaveBeenNthCalledWith(1, {
      state: 'start',
      class: 'TestClass',
      method: 'myMethod',
      args: ['test-str'],
    });
    expect(infoLoggerSpy).toHaveBeenNthCalledWith(2, {
      state: 'end',
      class: 'TestClass',
      method: 'myMethod',
      args: ['test-str'],
      result: 'test-str',
    });
  });

  it('should call `info` method of instance `Logger` for async method of class', async () => {
    @LogClass()
    class TestClass {
      public async myMethod(): Promise<string> {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve('test-async');
          }, 100);
        });
      }
    }
    const testInstance = new TestClass();
    await testInstance.myMethod();

    expect(infoLoggerSpy).toBeCalledTimes(2);
    expect(infoLoggerSpy).toHaveBeenNthCalledWith(1, {
      state: 'start',
      class: 'TestClass',
      method: 'myMethod',
      args: [],
    });
    expect(infoLoggerSpy).toHaveBeenNthCalledWith(2, {
      state: 'end',
      class: 'TestClass',
      method: 'myMethod',
      args: [],
      result: 'test-async',
    });
  });

  it('should call `error` method of instance `Logger` for sync method of class', () => {
    const testErrorMsg = 'test-sync-method-error';
    @LogClass()
    class TestClass {
      public myMethod(): string {
        throw new Error(testErrorMsg);
      }
    }
    const testInstance = new TestClass();
    expect(() => {
      testInstance.myMethod();
    }).toThrow(testErrorMsg);

    expect(infoLoggerSpy).toBeCalledTimes(1);
    expect(infoLoggerSpy).toHaveBeenNthCalledWith(1, {
      state: 'start',
      class: 'TestClass',
      method: 'myMethod',
      args: [],
    });
    expect(warnLoggerSpy).toBeCalledTimes(1);
    expect(warnLoggerSpy).toHaveBeenNthCalledWith(1, {
      state: 'end',
      class: 'TestClass',
      method: 'myMethod',
      args: [],
      error: new Error(testErrorMsg),
    });
  });

  it('should call `error` method of instance `Logger` for async method of class', async () => {
    const testErrorMsg = 'test-async-method-error';
    @LogClass()
    class TestClass {
      public async myMethod(): Promise<string> {
        throw new Error(testErrorMsg);
      }
    }
    const testInstance = new TestClass();
    try {
      await testInstance.myMethod();
    } catch (err) {
      expect(err).toEqual(new Error(testErrorMsg));
    }
    expect(infoLoggerSpy).toBeCalledTimes(1);
    expect(infoLoggerSpy).toHaveBeenNthCalledWith(1, {
      state: 'start',
      class: 'TestClass',
      method: 'myMethod',
      args: [],
    });
    expect(warnLoggerSpy).toBeCalledTimes(1);
    expect(warnLoggerSpy).toHaveBeenNthCalledWith(1, {
      state: 'end',
      class: 'TestClass',
      method: 'myMethod',
      args: [],
      error: new Error(testErrorMsg),
    });
  });

  it('should use passed logger methods of instance `Logger`', async () => {
    const testLogger = new Logger();
    const infoTestLoggerSpy = jest.spyOn(testLogger, 'info');
    @LogClass(testLogger)
    class TestClass {
      public myMethod(a: string): string {
        return a;
      }
    }
    const testInstance = new TestClass();
    testInstance.myMethod('test-str');

    expect(infoTestLoggerSpy).toBeCalledTimes(2);
    expect(infoTestLoggerSpy).toHaveBeenNthCalledWith(1, {
      state: 'start',
      class: 'TestClass',
      method: 'myMethod',
      args: ['test-str'],
    });
    expect(infoLoggerSpy).toHaveBeenNthCalledWith(2, {
      state: 'end',
      class: 'TestClass',
      method: 'myMethod',
      args: ['test-str'],
      result: 'test-str',
    });
  });
});
