import type { PaginationQuery } from '@/server/dtos/pagination';

export const formatPaginationParams = <Q extends PaginationQuery>({
  perPage: limit,
  ...otherQueryParams
}: Q) => {
  return {
    ...otherQueryParams,
    limit,
  };
};
