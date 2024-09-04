import { resolve, join } from 'path';

import loadCMSConfig from 'payload/dist/config/load';
import { execaNode } from 'execa';
import { rm } from 'fs-extra';
import { build } from 'tsup';
import buildNextApp from 'next/dist/build';

import '../../src/server/load-env';
import { publicEnv } from '../../src/server/env/public';

import { baseTsupConfig } from './tsup/base-config';
import { waitForRequest } from './wait-for-request';
import { clearDistDir } from './clear-dist-dir';

export class Builder {
  public static fullRootPath = resolve(__dirname, '../..');

  private static logBuildStart(appLabel: string) {
    console.log(`Build of ${appLabel} has started...`);
  }

  private static logBuildEnd(appLabel: string) {
    console.log(`Build of ${appLabel} has ended successfully !`);
  }

  public static async buildCMSConfig() {
    this.logBuildStart('CMS Config');

    await build({
      ...baseTsupConfig,
      entry: ['./payload.config.ts'],
    });

    this.logBuildEnd('CMS Config');
  }

  public static async buildClient() {
    // building cms admin panel
    this.logBuildStart('CMS Admin panel');

    const cmsConfig = await loadCMSConfig(); // Will throw its own error if it fails

    await cmsConfig.admin.bundler.build(cmsConfig);

    this.logBuildEnd('CMS Admin panel');

    // building client-sde app
    this.logBuildStart('client-side app');

    await build({
      ...baseTsupConfig,

      publicDir: './src/server/static',

      entry: {
        'dummy-server': './src/server/index.ts',
      },

      define: {
        'process.env.IS_CLIENT_DISABLED': 'true',
      },
    });

    const dummyServerFilePath = join(this.fullRootPath, 'dist/dummy-server.js');

    const dummyServerProcess = execaNode(dummyServerFilePath);

    const healthcheckUrl = new URL('/api/health', publicEnv.BASE_URL);

    await waitForRequest(healthcheckUrl);

    await buildNextApp(
      this.fullRootPath,
      false,
      false,
      false,
      false,
      false,
      false,
      null,
      'default',
    );

    dummyServerProcess.kill();

    await dummyServerProcess.catch(() => {});

    await rm(dummyServerFilePath);

    this.logBuildEnd('client-side app');
  }

  public static async buildServer(isDev: boolean = false) {
    this.logBuildStart('server-side app');

    await build({
      ...baseTsupConfig,

      publicDir: './src/server/static',

      entry: ['./src/server/index.ts'],

      watch: isDev,

      onSuccess: isDev ? 'node dist/index.js' : undefined,
    });

    this.logBuildEnd('server-side app');
  }

  public static async build(isDev: boolean = false) {
    await clearDistDir();

    await this.buildCMSConfig();

    if (!isDev) await this.buildClient();

    await this.buildServer(isDev);
  }
}
