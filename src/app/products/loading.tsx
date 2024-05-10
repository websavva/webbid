import { ProductGrid, ProductCardSkeleton } from '@/components/ProductReels';
import { PRODUCTS_PER_PAGE } from './config';

export default function ProductsPageSkeleton() {
  return (
    <ProductGrid count={3}>
      {[...Array(PRODUCTS_PER_PAGE).keys()].map((index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </ProductGrid>
  );
}
