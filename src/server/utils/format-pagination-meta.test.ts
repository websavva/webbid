import { describe, expect, it } from 'vitest';

import type { PaginatedDocs } from 'payload/database';

import { formatPaginationMeta } from './format-pagination-meta';

const paginatedDocs: PaginatedDocs = {
  docs: [],
  hasNextPage: true,
  hasPrevPage: true,
  limit: 15,
  nextPage: 5,
  page: 4,
  pagingCounter: 100,
  prevPage: 3,
  totalDocs: 500,
  totalPages: 34,
};

describe('formatPaginationMeta', () => {
  it('should rename rename and pass all fields', () => {
    expect(formatPaginationMeta(paginatedDocs)).toEqual({
      perPage: 15,
      pagesCount: 34,
      page: 4,
    });
  });

  it('should set default page', () => {
    const {
      page,

      ...paginatedDocsWithoutPage
    } = paginatedDocs;

    expect(formatPaginationMeta(paginatedDocsWithoutPage)).toEqual({
      perPage: 15,
      pagesCount: 34,
      page: 1,
    });
  });
});
