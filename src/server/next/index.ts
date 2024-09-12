import createNextApp from 'next';

import { privateEnv } from '../env/private';

const isDev = process.env.NODE_ENV !== 'production';

export const nextApp = createNextApp({
  port: privateEnv.PORT,
  dev: isDev,
});
