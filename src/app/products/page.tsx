import type { PagePropsWithSearchParams } from '@/types/page-props';
import { ProductsSearchForm } from '@/components/ProductsSearchForm';
import { Container } from '@/components/ui/Container';
import { ProductGrid, ProductCard } from '@/components/ProductReels';
import { Pagination } from '@/components/ui/Pagination';

import {
  type ProductsPageSearchParams,
  ProductsPageSearchParamsSchema,
} from './config';
import { trpcClient } from '@/lib/trpc';

export default async function ProductsPage({
  searchParams: query,
}: PagePropsWithSearchParams<keyof ProductsPageSearchParams>) {
  const {
    page,

    ...form
  } = ProductsPageSearchParamsSchema.parse(query);

  const [{ products, paginationMeta }, category] = await Promise.all([
    trpcClient.products.getProducts.query({
      page,
      perPage: 8,
      ...form,
    }),
    Promise.resolve(
      form.category
        ? trpcClient.products.categories.getCategoryByName.query(form.category)
        : null
    ),
  ]);

  const title = category?.label || 'Products';

  return (
    <Container className='mx-auto py-16'>
      <h1 className='mb-8 font-bold text-3xl text-gray-800'>{title}</h1>

      <ProductsSearchForm form={form} className='w-2/4' />

      {products.length > 0 ? (
        <div className='mt-20'>
          <ProductGrid count={3}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductGrid>

          {paginationMeta!.pagesCount > 1 && (
            <Pagination
              page={paginationMeta!.page}
              pagesCount={paginationMeta!.pagesCount}
              className='mt-12 justify-start'
            />
          )}
        </div>
      ) : (
        <span className='text-lg text-muted-foreground block mt-8'>
          No products were found ...
        </span>
      )}
    </Container>
  );
}
