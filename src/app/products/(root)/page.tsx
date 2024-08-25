import type { Metadata } from 'next';

import type { PagePropsWithSearchParams } from '@/types/page-props';
import { ProductsSearchForm } from '@/components/ProductsSearchForm';
import { ProductReelsGrid, ProductReelsCard } from '@/components/ProductReels';
import { Pagination } from '@/components/UI/Pagination';
import { trpcClient } from '@/lib/trpc';

import {
  type ProductsPageSearchParams,
  ProductsPageSearchParamsSchema,
  PRODUCTS_PER_PAGE,
} from './config';

type ProductsPageProps = PagePropsWithSearchParams<
  keyof ProductsPageSearchParams
>;

export async function generateMetadata({
  searchParams: query,
}: ProductsPageProps): Promise<Metadata> {
  try {
    const { category: caregoryId } =
      ProductsPageSearchParamsSchema.parse(query);

    if (caregoryId) {
      const { label: categoryLabel } =
        await trpcClient.products.categories.getCategoryByName.query(
          caregoryId,
        );

      return {
        title: `${categoryLabel} | Products`,
        description: `On this page you can find product which belong to the category "${categoryLabel}".`,
      };
    } else {
      return {
        title: 'All Products',
        description: 'On this page all available products are listed.',
      };
    }
  } catch {
    return {
      title: 'Products',
      description: 'You can find some products on this page.',
    };
  }
}

export default async function ProductsPage({
  searchParams: query,
}: ProductsPageProps) {
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
        : null,
    ),
  ]);

  const title = category?.label || 'Products';

  return (
    <div>
      <h1 className='mb-8 font-bold text-3xl text-gray-800'>{title}</h1>

      <ProductsSearchForm form={form} className='w-2/4' />

      {products.length > 0 ? (
        <div className='mt-10 lg:mt-20'>
          <ProductReelsGrid
            count={3}
            className='max-sm:css-var-[--column-counts=1] max-lg:css-var-[--column-counts=2] gap-x-10 lg:gap-x-20 gap-y-10 sm:gap-y-16'
          >
            {products.map((product) => (
              <ProductReelsCard key={product.id} product={product} />
            ))}
          </ProductReelsGrid>

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
