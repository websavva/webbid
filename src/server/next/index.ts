import createNextApp from 'next';
import { isProduction } from 'std-env';

import { ctx } from '../context';

export const nextApp = createNextApp({
  port: ctx.env.PORT,
  dev: !isProduction,
});
