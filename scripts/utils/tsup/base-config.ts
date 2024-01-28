import type { Options } from 'tsup';

import { JsxRuntimAutoImportPlugin } from './plugins/jsx-runtime-auto-import';

export const baseTsupConfig: Options = {
  outDir: 'dist',
  format: 'cjs',

  esbuildPlugins: [JsxRuntimAutoImportPlugin],
};
