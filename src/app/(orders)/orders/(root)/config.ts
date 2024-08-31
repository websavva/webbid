import type { z } from 'zod';

import { GetOrdersQuerySchema } from '#server/dtos/orders';

export const OrdersPageSearchParamsSchema = GetOrdersQuerySchema.pick({
  page: true,
  status: true,
});

export type OrdersPageSearchParams = z.infer<
  typeof OrdersPageSearchParamsSchema
>;

export const ORDERS_PER_PAGE = 5;
