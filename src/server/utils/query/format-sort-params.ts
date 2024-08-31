import { SortDir } from '@/consts/sort-dir';

export const formatSortParams = <
  Q extends {
    sortBy?: string;
    sortDir?: SortDir;
  },
>({
  sortBy = 'created',
  sortDir = SortDir.Desc,
  ...otherQueryParams
}: Q) => {
  let sort = sortBy;

  if (sortDir === SortDir.Desc) sort = `-${sort}`;

  return {
    ...otherQueryParams,
    sort,
  };
};
