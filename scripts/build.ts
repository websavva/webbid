import { build } from 'tsup';

import { baseTsupConfig } from './utils/tsup/base-config';
import { parseArgs } from './utils/parse-args';

const { watch: isWatchMode } = parseArgs();

build({
  ...baseTsupConfig,
  outDir: 'dist',
  format: 'cjs',
  entry: ['./src/server/index.ts'],
  watch: isWatchMode,
  onSuccess: isWatchMode ? 'node dist/index.js' : undefined,
});
