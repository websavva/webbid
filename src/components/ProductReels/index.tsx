import { CSSProperties, Suspense } from 'react';

import type { DefineProps } from '@/types';
import { trpcClient } from '@/lib/trpc';
import { cn } from '@/lib/utils/cn';
import { ProductCard, ProductCardSkeleton } from './ProductCard';

export type ProductReelsProps = DefineProps<{
  count?: number;
  category?: string;
}>;

const ProductList = async ({
  count = 3,
  category,
}: Pick<ProductReelsProps, 'count' | 'category'>) => {
  const { docs: products } = await trpcClient.products.getProducts.query({
    perPage: count,
    category,
  });

  return products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
};

const ProductListSkeleton = ({
  count = 3,
}: Pick<ProductReelsProps, 'count'>) => {
  return [...new Array(count).keys()].map((key) => (
    <ProductCardSkeleton key={key} />
  ));
};

export const ProductReels = ({
  title,
  count = 3,
  category,
  className,
  ...attrs
}: ProductReelsProps) => {
  const style = {
    '--column-counts': count,
  } as CSSProperties;

  return (
    <div
      {...attrs}
      className={cn(
        'grid grid-cols-[repeat(var(--column-counts),_1fr)] gap-8',
        className
      )}
      style={style}
    >
      <Suspense fallback={<ProductListSkeleton count={count} />}>
        <ProductList count={count} category={category} />
      </Suspense>
    </div>
  );
};
