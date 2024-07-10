import { CronJob } from 'cron';

import { OrderStatus } from '@/consts/order-status';

import { privateEnv } from '../env/private';
import { CMS } from '../cms';

export const staleOrdersRemovalJob = CronJob.from({
  cronTime: '*/1 * * * *',

  onTick: async () => {
    await CMS.client.update({
      collection: 'orders',
      data: {
        status: OrderStatus.Canceled,
      },

      where: {
        status: {
          equals: OrderStatus.Processing,
        },

        createdAt: {
          less_than_equal: new Date(
            Date.now() +
              privateEnv.STRIPE.STRIPE_ORDER_SESSION_VALIDITY_DURATION * 60 * 1e3
          ),
        },
      },
    });
  },

  start: false,

  runOnInit: false,
});
