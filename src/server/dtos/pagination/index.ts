import { z } from 'zod';

import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from '@/consts/pagination';

export const PaginationQuerySchema = z.object({
  page: z.number().optional().default(DEFAULT_PAGE),
  perPage: z.number().optional().default(DEFAULT_PER_PAGE),
});

export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;
