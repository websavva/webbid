import { resolve } from 'path';

import loadCMSConfig from 'payload/dist/config/load';
import { build } from 'tsup';
import buildNextApp from 'next/dist/build';

import '../../src/server/load-env';

import { baseTsupConfig } from './tsup/base-config';
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
