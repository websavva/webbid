import { build } from 'tsup';

import { baseTsupConfig } from './utils/tsup/base-config';
import { runCommand } from './utils/run-command';

runCommand(async () => {
  await build({
    ...baseTsupConfig,
    entry: ['./payload.config.ts'],
  });
});
