import path from 'path';

import express from 'express';
import bodyParser from 'body-parser';

import { createExpressMiddleware } from '@trpc/server/adapters/express';

import './env/load';
import { CMS } from './cms';
import { nextApp } from './next';
import { appRouter, createContext } from './trpc';
import { stripeWebhookHandler } from './stripe/webhook';
import { healthHandler } from './health';
import { TasksManager } from './jobs/jobs-manager';
import { privateEnv } from './env/private';

const resolvePath = (...paths: string[]) => path.resolve(__dirname, ...paths);

async function start() {
  const app = express();

  // setup of Stripe Webhook to register successful payments
  app.post(
    '/api/webhooks/stripe',
    bodyParser.raw({
      type: 'application/json',
    }),
    stripeWebhookHandler,
  );

  // initializing payload cms
  await CMS.init(app);

  // initializing public directory
  const publicDirSrc = resolvePath('./public');

  app.use(express.static(publicDirSrc));

  // initializing trpc
  const trpcMiddleware = createExpressMiddleware({
    router: appRouter,
    batching: {
      enabled: false,
    },
    createContext,
  });

  app.use('/api/trpc', trpcMiddleware);

  // health check endpoint
  app.get('/api/health', healthHandler);

  // starting all scheduled jobs
  TasksManager.init();

  // initializing next application
  const nextAppRequestHandler = nextApp.getRequestHandler();

  app.use((req, res) => nextAppRequestHandler(req, res));

  console.log('Preparing Next.js application...');

  await nextApp.prepare();

  // root server listening
  app.listen(privateEnv.PORT, () => {
    console.log(`Server is up and running on port ${privateEnv.PORT}`);
  });
}

start();
