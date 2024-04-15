import { build } from 'tsup';
import { copy } from 'fs-extra'

import { baseTsupConfig } from './utils/tsup/base-config';
import { runCommand } from './utils/run-command'

interface BuildCommandArgs {
  watch: string;
};

runCommand<BuildCommandArgs>(async(options) => {
  const isWatchMode = Boolean(options.watch);

  await copy('./src/server/public', './dist/public');

  await build({
    ...baseTsupConfig,
    outDir: 'dist',
    format: 'cjs',
    entry: ['./src/server/index.ts'],

    watch: isWatchMode,
    onSuccess: isWatchMode ? 'node dist/index.js' : undefined,
  });

})
