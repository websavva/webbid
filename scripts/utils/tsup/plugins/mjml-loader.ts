import { readFile } from 'fs/promises';

import type { Plugin } from 'esbuild';
import mjmlToHtml from 'mjml';

const cache = new Map<string, string>();

export const MjmlLoaderPlugin: Plugin = {
  name: 'mjml-loader',
  setup(build) {
    build.onLoad(
      {
        filter: /\.mjml$/,
      },
      async ({ path }) => {
        let contents: string;
        if (cache.has(path)) {
          contents = cache.get(path)!;
        } else {
          const rawContent = await readFile(path, 'utf-8');

          const { html } = mjmlToHtml(rawContent, {
            validationLevel: 'strict',
            filePath: path,
          });

          contents = html;

          cache.set(path, contents);
        }

        return {
          contents,
          loader: 'text' as const,
        };
      }
    );
  },
};
