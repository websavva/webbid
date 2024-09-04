import path from 'path';

import { defineConfig, devices } from '@playwright/test';

import './src/server/load-env';
import { publicEnv } from './src/server/env/public';

// Set webServer.url and use.baseURL with the location of the WebServer respecting the correct set port
const { BASE_URL: baseURL } = publicEnv;

// Reference: https://playwright.dev/docs/test-configuration
export default defineConfig({
  // Timeout per test
  timeout: 30 * 1000,

  // Test directory
  testDir: path.join(__dirname, 'src/e2e'),

  retries: 2,

  globalSetup: './src/e2e/global-setup.cjs',

  use: {
    // Use baseURL so to make navigations relative.
    // More information: https://playwright.dev/docs/api/class-testoptions#test-options-base-url
    baseURL,

    // All available context options: https://playwright.dev/docs/api/class-browser#browser-new-context
    contextOptions: {
      ignoreHTTPSErrors: true,
    },
  },

  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
  ],
});
