import { defineConfig, mergeConfig } from 'vitest/config';

import baseConfig from '../base.config';

import { serverIncludeGlobPatterns } from '../server.config';

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      include: ['src/**/*.test.ts?(x)'],
      exclude: serverIncludeGlobPatterns,
      setupFiles: ['vitest/client/setup.ts'],
    },
  }),
);
