import path from 'path';

import express from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';

import './env';
import { CMS } from './cms';
import { nextApp } from './next';
import { ctx } from './context';
import { appRouter, createContext } from './trpc';

const resolvePath = (...paths: string[]) => path.resolve(__dirname, ...paths);

async function start() {
  const app = express();

  // initializing payload cms
  await CMS.init(app);

  // initializing public directory
  const publicDirSrc = resolvePath('./public');

  app.use(express.static(publicDirSrc));

  // initializing trcp
  const trpcMiddleware = createExpressMiddleware({
    router: appRouter,
    createContext,
  });

  app.use('/api/trpc', trpcMiddleware);

  // initializing next application
  const nextAppRequestHandler = nextApp.getRequestHandler();

  app.use((req, res) => nextAppRequestHandler(req, res));

  console.log('Preparing Next.js application...');

  await nextApp.prepare();

  // root server listening
  app.listen(ctx.env.PORT, () => {
    console.log(`Server is up and running on port ${ctx.env.PORT}`);
  });
}

start();
