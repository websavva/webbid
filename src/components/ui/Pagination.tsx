'use client';

import * as React from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { withQuery } from 'ufo';

import { cn } from '@/lib/utils/cn';
import { ButtonProps, Button } from '@/components/ui/Button';
import { DefineProps } from '@/types';
import {
  type UsePaginationOptions,
  usePagination,
  PaginationItemType,
} from '@/hooks/use-pagination';

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
));

PaginationContent.displayName = 'PaginationContent';

type PaginationItemProps = {
  isActive?: boolean;
} & ButtonProps;

const PaginationItem = ({
  isActive,
  size = 'icon',
  children,
  ...attrs
}: PaginationItemProps) => {
  return (
    <li>
      <Button
        aria-current={isActive ? 'page' : undefined}
        variant={isActive ? 'outline' : 'ghost'}
        size={size}
        {...attrs}
      >
        {children}
      </Button>
    </li>
  );
};

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationItem>) => (
  <PaginationItem
    aria-label='Go to previous page'
    size='default'
    className={cn('pl-2.5', className)}
    {...props}
  >
    <ChevronLeft className='h-4 w-4' />
  </PaginationItem>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationItem>) => (
  <PaginationItem
    aria-label='Go to next page'
    size='default'
    className={cn('pr-2.5', className)}
    {...props}
  >
    <ChevronRight className='h-4 w-4' />
  </PaginationItem>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className='h-4 w-4' />
    <span className='sr-only'>More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export type PaginationProps = DefineProps<UsePaginationOptions>;

const Pagination = ({
  pagesCount,
  page,
  boundaryCount,
  siblingsCount,
  onChange: _onChange,
  className,
  ...attrs
}: PaginationProps) => {
  const router = useRouter();
  const query = Object.fromEntries(useSearchParams().entries());
  const pathname = usePathname();

  const onChange = (page: number) => {
    if (_onChange) return _onChange(page);

    const updatedQuery: Record<string, any> = {
      ...query,
    };

    updatedQuery.page = page === 1 ? undefined : page;

    const updatedHref = withQuery(pathname, updatedQuery);

    router.push(updatedHref);
  };

  const { items } = usePagination({
    page,
    pagesCount,
    siblingsCount,
    boundaryCount,

    onChange,
  });

  return (
    <nav
      role='navigation'
      aria-label='pagination'
      className={cn('mx-auto flex w-full justify-center', className)}
      {...attrs}
    >
      <PaginationContent>
        {items.map(
          (
            {
              type,
              page,
              disabled,
              selected,

              onActivate,
            },
            index
          ) => {
            switch (type) {
              case PaginationItemType.Page:
                return (
                  <PaginationItem
                    key={`${PaginationItemType.Page}-${page}`}
                    isActive={selected}
                    onClick={onActivate}
                  >
                    {page}
                  </PaginationItem>
                );

              case PaginationItemType.Ellipsis:
                return <PaginationEllipsis key={`ellipsis-${index}`} />;
            }
          }
        )}
      </PaginationContent>
    </nav>
  );
};

Pagination.displayName = 'Pagination';

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
};
