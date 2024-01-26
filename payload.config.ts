import { buildConfig } from 'payload/config';

import { postgresAdapter } from '@payloadcms/db-postgres';
import { slateEditor as slateEditorAdapter } from '@payloadcms/richtext-slate';
import { webpackBundler as webpackBundlerAdapter } from '@payloadcms/bundler-webpack';

import './src/server/env';
import { collections } from './src/server/cms/collections';

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,

  collections,

  admin: {
    bundler: webpackBundlerAdapter(),
  },

  editor: slateEditorAdapter({}),

  db: postgresAdapter({
    pool: {
      database: process.env.POSTGRES_DB,
      port: process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },
  }),
});
