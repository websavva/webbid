import type { Express } from 'express';
import payload from 'payload';

import { createSMTPransport } from '#server/mail/transport';

import { privateEnv } from '../env/private';
import { publicEnv } from '../env/public';

export class CMS {
  public static client: Awaited<ReturnType<(typeof payload)['init']>>;

  static async init(expressApp: Express) {
    if (this.client) return this.client;

    const smtpTransport = await createSMTPransport();

    this.client = await payload.init({
      secret: privateEnv.PAYLOAD_SECRET,
      express: expressApp,

      email: {
        transport: smtpTransport,
        fromAddress: publicEnv.SUPPORT_EMAIL,
        fromName: publicEnv.COMPANY_NAME,
      },

      onInit(cmsClient) {
        cmsClient.logger.info('Payload CMS has been set up successfully !');
      },
    });

    return this.client;
  }
}
