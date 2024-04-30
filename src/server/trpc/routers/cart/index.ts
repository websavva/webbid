import { z } from 'zod';
import { privateProcedure, router } from '../../helpers';
import { CMS } from '@/server/cms';

export const cartRouter = router({
  syncCart: privateProcedure
    .input(z.array(z.number()).default([]))
    .query(async ({ input: productIds = [] }) => {
      const { docs: products } = await CMS.client.find({
        collection: 'products',
        where: {
          id: {
            in: productIds,
          },
        },
      });

      return products;
    }),
});
