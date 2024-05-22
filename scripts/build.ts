import { build } from 'tsup';

import { baseTsupConfig } from './utils/tsup/base-config';
import { runCommand } from './utils/run-command';
import { clearDistDir } from './utils/clear-dist-dir';

interface BuildCommandArgs {
  watch: string;
}

runCommand<BuildCommandArgs>(async (options) => {
  const isWatchMode = Boolean(options.watch);

  await clearDistDir();

  await build({
    ...baseTsupConfig,

    publicDir: './src/server/static',

    entry: ['./src/server/index.ts'],

    watch: isWatchMode,

    onSuccess: isWatchMode ? 'node dist/index.js' : undefined,
  });
});
