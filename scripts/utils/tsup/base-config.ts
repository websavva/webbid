import type { Options } from 'tsup';

import { JsxRuntimAutoImportPlugin } from './plugins/jsx-runtime-auto-import';
import { builEnvDefine } from './env-define';

export const baseTsupConfig: Options = {
  outDir: 'dist',
  format: 'cjs',

  esbuildPlugins: [JsxRuntimAutoImportPlugin],
  define: builEnvDefine,
};
