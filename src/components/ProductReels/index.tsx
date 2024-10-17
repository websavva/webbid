import type { CSSProperties } from 'react';
import { Suspense } from 'react';

import type { DefineProps } from '@/types';
import { trpcClient } from '@/lib/trpc';
import { cn } from '@/lib/utils/cn';
import type { GetProductsQuery } from '#server/dtos/products';

import { ProductReelsCard, ProductReelsCardSkeleton } from './Card';

export * from './Card';

export type ProductReelsProps = DefineProps<
  {
    count?: number;
    EmptyPlaceholder?: () => JSX.Element;
  } & Partial<
    Pick<GetProductsQuery, 'category' | 'except' | 'sortBy' | 'sortDir'>
  >
>;

export const DefaultEmptyPlaceholder = () => (
  <div className='text-gray-500'>No products were found...</div>
);

export const ProductReelsGrid = ({
  count,
  className,
  children,

  ...attrs
}: DefineProps<{ count: number }>) => {
  const style = {
    '--default-column-counts': count,
  } as CSSProperties;

  return (
    <>
      <div
        {...attrs}
        className={cn(
          'grid grid-cols-[repeat(var(--column-counts,var(--default-column-counts)),_1fr)] gap-8',
          className,
        )}
        style={style}
      >
        {children}
      </div>
    </>
  );
};

const ProductList = async ({
  count = 3,
  category,
  sortBy,
  sortDir,
  except,
  EmptyPlaceholder = DefaultEmptyPlaceholder,
  ...attrs
}: ProductReelsProps) => {
  const { products } = await trpcClient.products.getProducts.query({
    perPage: count,

    category,

    sortBy,
    sortDir,

    except,
  });

  if (products.length) {
    return (
      <ProductReelsGrid {...attrs} count={count}>
        {products.map((product) => (
          <ProductReelsCard key={product.id} product={product} />
        ))}
      </ProductReelsGrid>
    );
  } else {
    return <EmptyPlaceholder />;
  }
};

const ProductListSkeleton = ({
  count = 3,
}: Pick<ProductReelsProps, 'count'>) => {
  return [...new Array(count).keys()].map((key) => (
    <ProductReelsCardSkeleton key={key} />
  ));
};

export const ProductReels = ({
  count = 3,
  category,
  sortDir,
  sortBy,
  except,
  EmptyPlaceholder,
  ...attrs
}: ProductReelsProps) => {
  return (
    <Suspense
      fallback={
        <ProductReelsGrid {...attrs} count={count}>
          <ProductListSkeleton count={count} />
        </ProductReelsGrid>
      }
    >
      <ProductList
        {...attrs}
        count={count}
        category={category}
        sortBy={sortBy}
        sortDir={sortDir}
        EmptyPlaceholder={EmptyPlaceholder}
        except={except}
      />
    </Suspense>
  );
};
