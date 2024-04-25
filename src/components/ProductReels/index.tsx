import { CSSProperties, ReactNode, Suspense, FunctionComponent } from 'react';

import type { DefineProps } from '@/types';
import { trpcClient } from '@/lib/trpc';
import { cn } from '@/lib/utils/cn';
import type { GetProductsQuery } from '@/server/dtos/products';

import { ProductCard, ProductCardSkeleton } from './ProductCard';

export type ProductReelsProps = DefineProps<
  {
    count?: number;
    EmptyPlaceholder?: FunctionComponent<void>;
  } & Pick<GetProductsQuery, 'category' | 'except'>
>;

export const DefaultEmptyPlaceholder = () => (
  <div className='text-gray-500'>No products were found...</div>
);

const ProductList = async ({
  count = 3,
  category,
  except,
  EmptyPlaceholder = DefaultEmptyPlaceholder,
  className,
  ...attrs
}: ProductReelsProps) => {
  const { docs: products } = await trpcClient.products.getProducts.query({
    perPage: count,
    category,
    except,
  });

  if (!products.length) {
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
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
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
  except,
  EmptyPlaceholder,
  ...attrs
}: ProductReelsProps) => {
  return (
    <Suspense fallback={<ProductListSkeleton count={count} />}>
      <ProductList
        {...attrs}
        count={count}
        category={category}
        EmptyPlaceholder={EmptyPlaceholder}
        except={except}
      />
    </Suspense>
  );
};
