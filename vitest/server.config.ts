import { defineConfig, mergeConfig } from 'vitest/config';

import baseConfig from './base.config';

export const serverIncludeGlobPatterns = [
  'src/{server,middlewares,modules}/**/*.test.ts?(x)',
];

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      environment: 'node',
      include: serverIncludeGlobPatterns,
    },
  }),
);
