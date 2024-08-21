import type { PagePropsWithSearchParams } from '@/types/page-props';
import { ProductsSearchForm } from '@/components/ProductsSearchForm';
import { ProductGrid, ProductCard } from '@/components/ProductReels';
import { Pagination } from '@/components/UI/Pagination';
import { trpcClient } from '@/lib/trpc';

import {
  type ProductsPageSearchParams,
  ProductsPageSearchParamsSchema,
  PRODUCTS_PER_PAGE,
} from './config';

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
      perPage: PRODUCTS_PER_PAGE,
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
    <div>
      <h1 className='mb-8 font-bold text-3xl text-gray-800'>{title}</h1>
      <ProductsSearchForm form={form} className='w-2/4' />
      {products.length > 0 ? (
        <div className='mt-10 lg:mt-20'>
          <ProductGrid count={3} className='max-sm:css-var-[--column-counts=1] max-lg:css-var-[--column-counts=2] gap-x-10 lg:gap-x-20 gap-y-10 sm:gap-y-16'>
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
    </div>
  );
}
