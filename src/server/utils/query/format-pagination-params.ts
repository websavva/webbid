import type { PaginationQuery } from '@/server/dtos/pagination';

export const formatPaginationParams = <Q extends PaginationQuery>({
  perPage: limit,
  ...otherQueryParams
}: Q) => {
  const isPaginationEnabled = limit !== null;

  return {
    ...otherQueryParams,
    limit: isPaginationEnabled ? limit : undefined,
    pagination: isPaginationEnabled,
  };
};
