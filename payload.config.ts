import path from 'path';

import { buildConfig } from 'payload/config';

import { postgresAdapter } from '@payloadcms/db-postgres';
import { slateEditor as slateEditorAdapter } from '@payloadcms/richtext-slate';
import { webpackBundler as webpackBundlerAdapter } from '@payloadcms/bundler-webpack';

import '#server/env';
import { collections } from '#server/cms/collections';

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,

  collections,

  admin: {
    bundler: webpackBundlerAdapter(),
  },

  cookiePrefix: 'digital-marketplace',

  editor: slateEditorAdapter({}),

  db: postgresAdapter({
    pool: {
      database: process.env.POSTGRES_DB,
      port: process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },

    migrationDir: path.resolve(__dirname, '../src/server/migrations'),
  }),

  typescript: {
    outputFile: path.resolve(
      __dirname,
      '../src/server/cms/collections/types.ts'
    ),
  },
});
