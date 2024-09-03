import type { PaginationQuery } from '#server/dtos/pagination';

export interface FormattedPaginationParams {
  limit?: number;
  pagination: boolean;
}

export const formatPaginationParams = <Query extends PaginationQuery>({
  perPage: limit,
  ...otherQueryParams
}: Query) => {
  let formattedPaginationParams: FormattedPaginationParams;

  if (limit !== null) {
    formattedPaginationParams = {
      pagination: true,
      limit,
    };
  } else {
    formattedPaginationParams = {
      pagination: false,
    };
  }

  return {
    ...otherQueryParams,
    ...formattedPaginationParams,
  };
};
