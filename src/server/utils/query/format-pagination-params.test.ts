import { describe, expect, it } from 'vitest';

import { formatPaginationParams } from './format-pagination-params';

describe('formatPaginationParams', () => {
  const cases = [
    {
      name: 'pagination is disabled',
      rawParams: {
        page: 1,
        perPage: null,
      },

      formattedParams: {
        page: 1,
        pagination: false,
      },
    },
    {
      name: 'pagination is enabled',
      rawParams: {
        page: 1,
        perPage: 5,
      },

      formattedParams: {
        page: 1,
        limit: 5,
        pagination: true,
      },
    },
    {
      name: 'pagination is enabled with custom page',
      rawParams: {
        page: 5,
        perPage: 18,
      },

      formattedParams: {
        page: 5,
        limit: 18,
        pagination: true,
      },
    },
  ];

  it.each(cases)('$name', ({ rawParams, formattedParams }) => {
    expect(formatPaginationParams(rawParams as any)).toEqual(formattedParams);
  });
});
