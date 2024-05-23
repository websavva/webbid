import createNextApp from 'next';
import { isProduction } from 'std-env';

import { privateEnv } from '../env/private';

export const nextApp = createNextApp({
  port: privateEnv.PORT,
  dev: !isProduction,
});
