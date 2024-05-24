import { GetOrdersQuerySchema } from '#server/dtos/orders';
import { z } from 'zod';

export const OrdersPageSearchParamsSchema = GetOrdersQuerySchema.pick({
  page: true,
  status: true,
});

export type OrdersPageSearchParams = z.infer<
  typeof OrdersPageSearchParamsSchema
>;

export const ORDERS_PER_PAGE = 5;
