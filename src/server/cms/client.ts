import type { Express } from 'express';
import payload from 'payload';

import { ctx } from '#server/context';
import { createSMTPransport } from '#server/mail/transport';

export class CMS {
  public static client: Awaited<ReturnType<(typeof payload)['init']>>;

  static async init(expressApp: Express) {
    if (this.client) return this.client;

    const smtpTransport = await createSMTPransport();

    const {
      SMTP: { FROM_ADDRESS: fromAddress, FROM_NAME: fromName },
    } = ctx.env;

    this.client = await payload.init({
      secret: process.env.PAYLOAD_SECRET!,
      express: expressApp,

      email: {
        transport: smtpTransport,
        fromAddress,
        fromName,
      },

      onInit(cmsClient) {
        cmsClient.logger.info('Payload CMS has been set up successfully !');
      },
    });

    return this.client;
  }
}
