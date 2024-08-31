import { readFile } from 'fs/promises';

import type { Plugin } from 'esbuild';

export const JsxRuntimAutoImportPlugin: Plugin = {
  name: 'jsx-runtime-auto-imports',

  setup(build) {
    build.onLoad(
      {
        filter: /\.tsx$/,
      },
      async ({ path }) => {
        const rawContent = await readFile(path, 'utf-8');

        const contents = ["import * as React from 'react';", rawContent].join(
          '\n',
        );

        return {
          contents,
          loader: 'tsx' as const,
        };
      },
    );
  },
};
