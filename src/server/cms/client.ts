import type { Express } from 'express';
import payload from 'payload';

export class CMS {
  public static client: Awaited<ReturnType<(typeof payload)['init']>>;

  static async init(expressApp: Express) {
    if (this.client) return this.client;

    this.client = await payload.init({
      secret: process.env.PAYLOAD_SECRET!,
      express: expressApp,

      onInit(cmsClient) {
        cmsClient.logger.info('Payload CMS has been set up successfully !');
      },
    });

    return this.client;
  }
}
