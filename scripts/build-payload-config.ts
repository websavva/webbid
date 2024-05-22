import { build } from 'tsup';

import { baseTsupConfig } from './utils/tsup/base-config';
import { runCommand } from './utils/run-command';
import { clearDistDir } from './utils/clear-dist-dir';

runCommand(async () => {
  await clearDistDir();

  await build({
    ...baseTsupConfig,
    entry: ['./payload.config.ts'],
  });
});
