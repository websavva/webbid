import express from 'express';

import { nextApp } from './next';

async function start() {
  const app = express();

  // initializing next application
  const nextAppRequestHandler = nextApp.getRequestHandler();

  app.use((req, res) => nextAppRequestHandler(req, res));

  await nextApp.prepare();
}

start();
