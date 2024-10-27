import { vi, describe, it, expect, beforeEach } from 'vitest';

import { loadEnv } from './loader';

const mockedDotenvConfig = vi.hoisted(() => vi.fn());

vi.stubGlobal('process', {
  cwd: () => '/root',
});

vi.mock('dotenv', () => ({
  default: {
    config: mockedDotenvConfig,
  },
}));

describe('loadEnv', () => {
  beforeEach(() => {
    mockedDotenvConfig.mockClear();
  });

  it('should apply correct default value', () => {
    loadEnv();

    expect(mockedDotenvConfig.mock.calls).toHaveLength(2);
    expect(mockedDotenvConfig.mock.calls).toEqual([
      [
        {
          path: '/root/.env.build',
        },
      ],
      [
        {
          path: '/root/.env',
        },
      ],
    ]);
  });

  it('should load build env', () => {
    loadEnv(['build']);

    expect(mockedDotenvConfig.mock.calls).toHaveLength(1);
    expect(mockedDotenvConfig.mock.calls[0]).toEqual([
      {
        path: '/root/.env.build',
      },
    ]);
  });

  it('should load runtim env', () => {
    loadEnv(['runtime']);

    expect(mockedDotenvConfig.mock.calls).toHaveLength(1);
    expect(mockedDotenvConfig.mock.calls[0]).toEqual([
      {
        path: '/root/.env',
      },
    ]);
  });

  it('should load duplicated envs', () => {
    loadEnv(['runtime', 'build', 'runtime', 'build']);

    expect(mockedDotenvConfig.mock.calls).toHaveLength(4);
    expect(mockedDotenvConfig.mock.calls).toEqual([
      [
        {
          path: '/root/.env',
        },
      ],
      [
        {
          path: '/root/.env.build',
        },
      ],
      [
        {
          path: '/root/.env',
        },
      ],
      [
        {
          path: '/root/.env.build',
        },
      ],
    ]);
  });
});
