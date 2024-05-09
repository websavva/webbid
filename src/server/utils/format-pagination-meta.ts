import type { PaginatedDocs } from 'payload/database';

export const formatPaginationMeta = (paginatedDocs: PaginatedDocs) => {
  const {
    limit: perPage,
    page = 1,

    totalPages: pagesCount,
  } = paginatedDocs;

  return {
    page,
    perPage,
    pagesCount,
  };
};

export type PaginationMeta = ReturnType<typeof formatPaginationMeta>;
