import type { Options } from 'tsup';
import { defu } from 'defu';

import { JsxRuntimAutoImportPlugin } from './plugins/jsx-runtime-auto-import';
import { buildEnvDefine } from './env-define';

export const baseTsupConfig: Options = {
  outDir: 'dist',
  format: 'cjs',

  esbuildPlugins: [JsxRuntimAutoImportPlugin],
  define: buildEnvDefine,
};

export const extendBaseTsupConfig = (options: Options = {}) =>
  defu(options, baseTsupConfig);
