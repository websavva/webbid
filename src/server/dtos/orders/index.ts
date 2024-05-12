import { z } from 'zod';

import { OrderStatus } from '@/consts/order-status';

import { PaginationQuerySchema } from '../pagination';
import { getSortQuerySchema } from '../sort';

export const SORTABLE_FIELDS = ['createdAt'] as const;

export type GetOrdersSortableFieldName = (typeof SORTABLE_FIELDS)[number];

export const GetOrdersQuerySchema = PaginationQuerySchema.extend({
  status: z.nativeEnum(OrderStatus).optional(),
});

export type GetOrdersQuery = z.infer<typeof GetOrdersQuerySchema>;
