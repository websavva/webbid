import { build } from 'tsup';

import { baseTsupConfig } from './utils/tsup/base-config';

build({
  ...baseTsupConfig,
  entry: ['./payload.config.ts'],
});
