import { resolve } from 'path';

import { build } from 'tsup';
import buildNextApp from 'next/dist/build';

import '../src/server/load-env';
import { publicEnv} from '../src/server/env/public';

import { baseTsupConfig } from './utils/tsup/base-config';
import { runCommand } from './utils/run-command';
import { waitForServerSetup } from './utils/wait-for-server-setup';


interface BuildCommandArgs {
  watch: string;
}

runCommand<BuildCommandArgs>(async () => {
  await build({
    ...baseTsupConfig,

    publicDir: './src/server/static',

    entry: {
      'dummy-server': './src/server/index.ts',
    },

    onSuccess: 'node dist/dummy-server.js',

    define: {
      'process.env.IS_CLIENT_DISABLED': 'true',
    },
  });

  const healthcheckUrl = new URL('/api/health', publicEnv.BASE_URL);

  await waitForServerSetup(healthcheckUrl);

  const fullRootPath = resolve(__dirname, '..');

  await buildNextApp(
    fullRootPath,
    false,
    false,
    false,
    false,
    false,
    false,
    null,
    'default',
  );

  process.exit();
});
