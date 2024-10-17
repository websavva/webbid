import {
  ProductReelsGrid,
  ProductReelsCardSkeleton,
} from '@/components/ProductReels';

import { PRODUCTS_PER_PAGE } from './config';

export default function ProductsPageSkeleton() {
  return (
    <ProductReelsGrid
      count={3}
      className='gap-x-20 gap-y-16 max-lg:css-var-[--column-counts=2] max-sm:css-var-[--column-counts=1] sm:gap-y-16 lg:gap-x-20'
    >
      {[...Array(PRODUCTS_PER_PAGE).keys()].map((index) => (
        <ProductReelsCardSkeleton key={index} />
      ))}
    </ProductReelsGrid>
  );
}
