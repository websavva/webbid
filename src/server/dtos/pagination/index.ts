import { z } from 'zod';

import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '@/consts/pagination';

export const PaginationQuerySchema = z.object({
  page: z.coerce.number().optional().default(DEFAULT_PAGE),
  perPage: z.coerce.number().optional().nullish().default(DEFAULT_PER_PAGE),
});

export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;
