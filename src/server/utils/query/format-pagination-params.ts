import type { PaginationQuery } from '#server/dtos/pagination';

export type PaginationParams = Pick<PaginationQuery, 'page'> &
  (
    | {
        pagination: false;
      }
    | {
        pagination: true;
        limit: number;
      }
  );

export const formatPaginationParams = <Q extends PaginationQuery>({
  perPage: limit,
  page,
}: Q): PaginationParams => {
  if (limit !== null) {
    return {
      page,
      limit,
      pagination: true,
    };
  } else {
    return {
      page,
      pagination: false,
    };
  }
};
