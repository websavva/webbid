import { CSSProperties, Suspense, FunctionComponent } from 'react';

import type { DefineProps } from '@/types';
import { trpcClient } from '@/lib/trpc';
import { cn } from '@/lib/utils/cn';
import type { GetProductsQuery } from '@/server/dtos/products';

import { ProductCard, ProductCardSkeleton } from './ProductCard';

export * from './ProductCard';

export type ProductReelsProps = DefineProps<
  {
    count?: number;
    EmptyPlaceholder?: FunctionComponent<void>;
    isPaginationEnabled?: boolean;
  } & Partial<
    Pick<GetProductsQuery, 'category' | 'except' | 'sortBy' | 'sortDir'>
  >
>;

export const DefaultEmptyPlaceholder = () => (
  <div className='text-gray-500'>No products were found...</div>
);

export const ProductGrid = ({
  count,
  className,
  children,

  ...attrs
}: DefineProps<{ count: number }>) => {
  const style = {
    '--column-counts': count,
  } as CSSProperties;

  return (
    <>
      <div
        {...attrs}
        className={cn(
          'grid grid-cols-[repeat(var(--column-counts),_1fr)] gap-8',
          className
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
      <>
        <ProductGrid {...attrs} count={count}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      </>
    );
  } else {
    return <>{EmptyPlaceholder()}</>;
  }
};

const ProductListSkeleton = ({
  count = 3,
}: Pick<ProductReelsProps, 'count'>) => {
  return [...new Array(count).keys()].map((key) => (
    <ProductCardSkeleton key={key} />
  ));
};

export const ProductReels = ({
  count = 3,
  category,
  sortDir,
  sortBy,
  except,
  EmptyPlaceholder,
  isPaginationEnabled,
  ...attrs
}: ProductReelsProps) => {
  return (
    <Suspense
      fallback={
        <ProductGrid {...attrs} count={count}>
          <ProductListSkeleton count={count} />
        </ProductGrid>
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
        isPaginationEnabled={isPaginationEnabled}
      />
    </Suspense>
  );
};
