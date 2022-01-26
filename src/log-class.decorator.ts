import { types } from 'util';

import { Logger } from './logger';

type Class = { new (...args: any[]): {} };

class LogClassFactory<T extends Class> {
  // Instance of target
  private decoratedInstance: any;
  constructor(private readonly target: T, private readonly logger = new Logger()) {}

  /**
   * Method to create 'LogClass' decorator
   * @returns {T} decorated class
   */
  public create(): T {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    return class extends this.target {
      constructor(...args: any[]) {
        self.wrapTargetMethods();
        super(...args);
        self.decoratedInstance = this;
      }
    };
  }
  /**
   * Method for wrapping all method of target
   * @returns {void}
   */
  private wrapTargetMethods(): void {
    // Get All methods
    const nameMethods: string[] = Object.getOwnPropertyNames(this.target.prototype);

    nameMethods.forEach((nameMethod: string): void => {
      const originMethod = this.target.prototype[nameMethod];
      this.target.prototype[nameMethod] = this.wrapMethod(nameMethod, originMethod);
    });
  }

  /**
   * Method for wrapping on method
   * @param {(...args: any[]) => any} originMethod - some method
   * @returns {(...args: any[]) => any} - wrapped originMethod
   */
  private wrapMethod(nameMethod: string, originMethod: (...args: any[]) => any): (...args: any[]) => any {
    return (...args: any[]): any => {
      // Log 'start'
      this.logMethod(true, nameMethod, args);
      let result: any;
      // Try to execute method like sync
      try {
        result = originMethod.apply(this.decoratedInstance, args);
      } catch (err) {
        this.logError(nameMethod, args, err);
        throw err;
      }
      // If method is really sync - log and return
      if (!types.isAsyncFunction(originMethod) && typeof result.then !== 'function') {
        // Log finish
        this.logMethod(false, nameMethod, args, result);
        return result;
      }
      // Log result or error for async method
      return result
        .then((value: any) => {
          // Log finish
          this.logMethod(false, nameMethod, args, value);
          return value;
        })
        .catch((err: Error) => {
          this.logError(nameMethod, args, err);
          throw err;
        });
    };
  }

  /**
   * Method to log decorated method
   * @param {boolean} start - start or end
   * @param {string} nameMethod
   * @param {any[]} args
   * @param {any} result
   * @returns {void}
   */
  private logMethod(start: boolean, nameMethod: string, args: any[], result?: any): void {
    const className: string = this.target.name;
    this.logger.info({
      state: start ? 'start' : 'end',
      class: className,
      method: nameMethod,
      args,
      result,
    });
  }

  /**
   * Method to log error after executing of decorated method
   * @param {string} nameMethod
   * @param {any[]} args
   * @param {any} err
   * @returns {void}
   */
  private logError(nameMethod: string, args: any[], err: any): void {
    const className: string = this.target.name;
    this.logger.warn({
      state: 'end',
      class: className,
      method: nameMethod,
      args,
      error: err,
    });
  }
}

/**
 * Decorator 'LogClass'
 * @param {Logger} logger
 */
export function LogClass(logger = new Logger()): Function {
  return <T extends Class>(constructor: T): T => {
    const logClassFactory = new LogClassFactory(constructor, logger);
    return logClassFactory.create();
  };
}
