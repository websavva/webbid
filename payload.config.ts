import { buildConfig } from 'payload/config';

import { postgresAdapter } from '@payloadcms/db-postgres';
import { slateEditor as slateEditorAdapter } from '@payloadcms/richtext-slate';
import { webpackBundler as webpackBundlerAdapter } from '@payloadcms/bundler-webpack';

import { collections } from './src/server/cms/collections';

/** @type {import('payload/config').Config} */
const payloadConfig = {
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,

  collections,

  admin: {
    bundler: webpackBundlerAdapter(),
    webpack(config) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve?.fallback,
          assert: false,
          buffer: false,
          console: false,
          constants: false,
          events: false,
          http: false,
          https: false,
          os: false,
          path: false,
          process: false,
          querystring: false,
          stream: false,
          string_decoder: false,
          sys: false,
          timers: false,
          url: false,
          util: false,
          vm: false,
          v8: false,
          perf_hooks: false,
          module: false,
          fs: false,
          tty: false,
        },
      };

      return config;
    },
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
};

module.exports = buildConfig(payloadConfig);
