const { buildConfig } = require('payload/config');

const { postgresAdapter } = require('@payloadcms/db-postgres');
const {
  slateEditor: slateEditorAdapter,
} = require('@payloadcms/richtext-slate');
const {
  webpackBundler: webpackBundlerAdapter,
} = require('@payloadcms/bundler-webpack');

/** @type {import('payload/config').Config} */
const payloadConfig = ({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,

  collections: [],
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

module.exports = buildConfig(payloadConfig);
