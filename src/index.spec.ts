import * as all from './logger';

describe('/src/index.ts', () => {
  it('should be defined `Logger`', () => {
    expect(all).toHaveProperty('Logger');
  });
});
