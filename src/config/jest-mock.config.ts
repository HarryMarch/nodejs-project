import { Repository } from 'typeorm';

/**
 * Create mock factory instance for mocking repository in unit test
 */
// eslint-disable-next-line
// @ts-ignore 
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  }),
);

export type MockType<T> = {
  // eslint-disable-next-line
  [P in keyof T]: jest.Mock<{}>;
};
