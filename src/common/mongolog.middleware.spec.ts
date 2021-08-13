import { MongoLogMiddleware } from './mongolog.middleware';

describe('MongoLogMiddleware', () => {
  it('should be defined', () => {
    expect(new MongoLogMiddleware()).toBeDefined();
  });
});
