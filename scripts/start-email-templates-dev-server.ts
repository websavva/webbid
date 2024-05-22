import { build } from 'tsup';

import { baseTsupConfig } from './utils/tsup/base-config';
import { runCommand } from './utils/run-command';
import { clearDistDir } from './utils/clear-dist-dir';

runCommand(async () => {
  await clearDistDir();

  await build({
    ...baseTsupConfig,

    format: 'cjs',

    entry: ['./src/server/mail/dev-server/index.ts'],

    publicDir: './src/server/static',

    watch: true,

    onSuccess: 'node dist/index.js',
  });
});
