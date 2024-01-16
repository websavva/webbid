import express from 'express';

import { nextApp } from './next';
import { ctx } from './context';

async function start() {
  const app = express();

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
