import { vi, describe, it, expect, beforeEach } from 'vitest';

import { loadEnv } from './loader';

const mockedDotenvConfig = vi.hoisted(() => vi.fn());

vi.mock('dotenv', () => ({
  default: {
    config: mockedDotenvConfig,
  },
}));

describe('loadEnv', () => {
  beforeEach(() => {
    mockedDotenvConfig.mockClear()
  });

  it('should aplly correct default value', () => {
    loadEnv();

    expect(mockedDotenvConfig.mock.calls).toEqual([

    ])
  });
});
