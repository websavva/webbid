import path from 'path';

import express from 'express';
import bodyParser from 'body-parser';

import { createExpressMiddleware } from '@trpc/server/adapters/express';

import './load-env';
import { CMS } from './cms';
import { nextApp } from './next';
import { ctx } from './context';
import { appRouter, createContext } from './trpc';
import { stripeWebhookHandler } from './stripe/webhook';
import { TasksManager } from './jobs/jobs-manager';

const resolvePath = (...paths: string[]) => path.resolve(__dirname, ...paths);

async function start() {
  const app = express();

  // setup of Stripe Webhook to register successful payments
  app.post(
    '/api/webhooks/stripe',
    bodyParser.raw({
      type: 'application/json',
    }),
    stripeWebhookHandler
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

  // starting all scheduled jobs
  TasksManager.init();

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
