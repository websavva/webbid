import { describe, expect, it } from 'vitest';

import { SortDir } from '@/consts/sort-dir';

import { formatSortParams } from './format-sort-params';

describe('formatSortParams', () => {
  it('should use default sort params with no explicit sort params', () => {
    expect(formatSortParams({})).toEqual({
      sort: '-created',
    });
  });

  const cases = [
    {
      name: 'empty query',
      query: {},
      expectedParams: {
        sort: '-created',
      },
    },
    {
      name: 'only descending dir',
      query: {
        sortDir: SortDir.Desc,
      },
      expectedParams: {
        sort: '-created',
      },
    },
    {
      name: 'only ascending dir',
      query: {
        sortDir: SortDir.Asc,
      },
      expectedParams: {
        sort: 'created',
      },
    },
    {
      name: 'descending dir with custom sort name',
      query: {
        sortDir: SortDir.Desc,
        sortBy: 'price',
      },
      expectedParams: {
        sort: '-price',
      },
    },
    {
      name: 'only custom sort name',
      query: {
        sortBy: 'price',
      },
      expectedParams: {
        sort: '-price',
      },
    },
    {
      name: 'ascending dir with custom sort name',
      query: {
        sortDir: SortDir.Asc,
        sortBy: 'price',
      },
      expectedParams: {
        sort: 'price',
      },
    },
    {
      name: 'passing non-affected params',
      query: {
        foo: true,
        sortDir: SortDir.Asc,
        sortBy: 'price',
        bar: 'text',
      },
      expectedParams: {
        foo: true,
        bar: 'text',
        sort: 'price',
      },
    },
    {
      name: 'conflicting sort field',
      query: {
        sortDir: SortDir.Desc,
        sortBy: 'price',
        sort: 'conflicting-sort',
      },
      expectedParams: {
        sort: '-price',
      },
    },
  ];

  it.each(cases)('$name', ({ query, expectedParams }) => {
    expect(formatSortParams(query)).toEqual(expectedParams);
  });
});
