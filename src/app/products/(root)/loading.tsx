import {
  ProductReelsGrid,
  ProductReelsCardSkeleton,
} from '@/components/ProductReels';

import { PRODUCTS_PER_PAGE } from './config';

export default function ProductsPageSkeleton() {
  return (
    <ProductReelsGrid count={3} className='gap-x-20 gap-y-16'>
      {[...Array(PRODUCTS_PER_PAGE).keys()].map((index) => (
        <ProductReelsCardSkeleton key={index} />
      ))}
    </ProductReelsGrid>
  );
}
