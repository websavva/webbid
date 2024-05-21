import { CronJob } from 'cron';

import { CMS } from '../cms';
import { ctx } from '../context';
import { OrderStatus } from '@/consts/order-status';

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
              ctx.env.STRIPE.STRIPE_ORDER_SESSION_VALIDITY_DURATION * 60 * 1e3
          ),
        },
      },
    });
  },

  start: false,

  runOnInit: false,
});
