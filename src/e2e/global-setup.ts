import { resolve } from 'path';

import { execaNode } from 'execa';

import '../server/load-env';
import { publicEnv } from '../server/env/public';

import { waitForRequest } from '../../scripts/utils/wait-for-request';

async function globalSetup() {
  console.log('Global setup is running...');

  const serverProcess = execaNode(
    `${resolve(__dirname, '../../dist/index.js')}`,
  );

  await Promise.all(
    ['/api/health', '/health'].map((endpointPath) =>
      waitForRequest(new URL(endpointPath, publicEnv.BASE_URL)),
    ),
  );

  console.log('All health checks have been passed.');

  console.log('Global setup has completed !');

  return async () => {
    serverProcess.kill();

    await serverProcess.catch(() => {});

    console.log('Global teardown has completed');
  };
}

export default globalSetup;
