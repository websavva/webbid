import type { Options } from 'tsup';

import { MjmlLoaderPlugin } from './plugins/mjml-loader';

export const baseTsupConfig: Options = {
  outDir: 'dist',
  format: 'cjs',

  esbuildPlugins: [MjmlLoaderPlugin],
};
