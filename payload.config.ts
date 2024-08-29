import path from 'path';
import { defu } from 'defu';

import { buildConfig } from 'payload/config';

import { postgresAdapter } from '@payloadcms/db-postgres';
import { slateEditor as slateEditorAdapter } from '@payloadcms/richtext-slate';
import { webpackBundler as webpackBundlerAdapter } from '@payloadcms/bundler-webpack';

import '#server/load-env';
import { collections } from '#server/cms/collections';

// this workaround is necessary as it is built-in
// https://github.com/payloadcms/payload/blob/v2.16.0/packages/bundler-webpack/src/configs/base.ts#L88
const mockedPackages = ['crypto'];

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,

  collections,

  admin: {
    bundler: webpackBundlerAdapter(),

    webpack(config) {
      const alias = Object.fromEntries(
        mockedPackages.map((packageName) => [
          packageName,
          path.resolve(__dirname, `../src/server/cms/mocks/${packageName}.js`),
        ]),
      );

      return defu(config, {
        resolve: {
          alias,
        },
      });
    },
  },

  cookiePrefix: 'webbid',

  editor: slateEditorAdapter({}),

  db: postgresAdapter({
    pool: {
      database: process.env.POSTGRES_DB,
      port: process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST || 'localhost',
    },

    migrationDir: path.resolve(__dirname, '../src/server/migrations'),
  }),

  typescript: {
    outputFile: path.resolve(
      __dirname,
      '../src/server/cms/collections/types.ts',
    ),
  },
});
