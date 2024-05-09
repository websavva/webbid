import type { PaginationMeta } from '@/server/utils/format-pagination-meta';

export interface UsePaginationOptions
  extends Pick<PaginationMeta, 'page' | 'pagesCount'> {
  siblingsCount?: number;
  boundaryCount?: number;

  onChange?: (page: number) => any;
}

export enum PaginationItemType {
  Page = 'page',

  Ellipsis = 'ellipsis',

  Next = 'next',
  Previous = 'previous',

  First = 'first',
  Last = 'last',
}

export type PaginationItem = {
  selected: boolean;
  disabled: boolean;
  onActivate: () => any;
} & (
  | {
      type: PaginationItemType.Page;
      page: number;
    }
  | {
      type: Omit<PaginationItemType, PaginationItemType.Page>;
      page: null;
    }
);

export const usePagination = (options: UsePaginationOptions) => {
  // keep default values in sync with @default tags in Pagination.propTypes
  const {
    boundaryCount = 1,
    pagesCount: count = 1,
    page,
    siblingsCount = 1,
    onChange,
  } = options;

  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(
    Math.max(count - boundaryCount + 1, boundaryCount + 1),
    count
  );

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      page - siblingsCount,
      // Lower boundary when page is high
      count - boundaryCount - siblingsCount * 2 - 1
    ),
    // Greater than startPages
    boundaryCount + 2
  );

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      page + siblingsCount,
      // Upper boundary when page is low
      boundaryCount + siblingsCount * 2 + 2
    ),
    // Less than endPages
    endPages.length > 0 ? endPages[0] - 2 : count - 1
  );

  const isNextDisabled = page >= count;
  const isPreviousDisabled = page <= 1;

  type PaginationShortType =
    | number
    | Omit<PaginationItemType, PaginationItemType.Page>;

  const onPageActivate = (pageType: PaginationShortType) => {
    if (!onChange) return;

    const isEllipsis = pageType === PaginationItemType.Ellipsis;

    const isBackwardsDirection =
      pageType === PaginationItemType.First ||
      pageType === PaginationItemType.Previous;
    const isForwardDirection =
      pageType === PaginationItemType.Last ||
      pageType === PaginationItemType.Next;

    if (
      isEllipsis ||
      (isBackwardsDirection && isPreviousDisabled) ||
      (isForwardDirection && isNextDisabled)
    )
      return;

    let derivedPage: number;

    if (typeof pageType === 'number') {
      if (pageType === page) return;

      derivedPage = pageType;
    } else {
      switch (pageType) {
        case PaginationItemType.First:
          derivedPage = 1;
          break;

        case PaginationItemType.Previous:
          derivedPage = page - 1;
          break;

        case PaginationItemType.Last:
          derivedPage = count;
          break;

        case PaginationItemType.Next:
          derivedPage = page + 1;
      }
    }

    onChange(derivedPage!);
  };

  // Basic list of items to render
  // for example itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
  const itemTypeList: Array<PaginationShortType> = [
    PaginationItemType.First,
    PaginationItemType.Previous,
    ...startPages,

    // Start ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsStart > boundaryCount + 2
      ? [PaginationItemType.Ellipsis]
      : boundaryCount + 1 < count - boundaryCount
      ? [boundaryCount + 1]
      : []),

    // Sibling pages
    ...range(siblingsStart, siblingsEnd),

    // End ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsEnd < count - boundaryCount - 1
      ? [PaginationItemType.Ellipsis]
      : count - boundaryCount > boundaryCount
      ? [count - boundaryCount]
      : []),

    ...endPages,
    PaginationItemType.Next,
    PaginationItemType.Last,
  ];

  // Convert the basic item list to PaginationItem props objects
  const items: PaginationItem[] = itemTypeList.map((pageType) => {
    const onActivate = onPageActivate.bind(null, pageType);

    if (typeof pageType === 'number') {
      return {
        type: PaginationItemType.Page,
        page: pageType,
        selected: pageType === page,
        disabled: false,
        onActivate,
      };
    }

    let disabled: boolean;

    switch (pageType) {
      case PaginationItemType.Next:
      case PaginationItemType.Last:
        disabled = isNextDisabled;
        break;

      case PaginationItemType.First:
      case PaginationItemType.Previous:
        disabled = isPreviousDisabled;
        break;

      default:
        disabled = true;
    }

    return {
      type: pageType,
      page: null,
      selected: false,
      disabled,

      onActivate,
    };
  });

  return {
    items,
  };
};
