import type { PagePropsWithSearchParams } from '@/types/page-props';
import { ProductsSearchForm } from '@/components/ProductsSearchForm';
import { Container } from '@/components/ui/Container';
import { ProductReels } from '@/components/ProductReels';

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

  let title: string;

  if (form.category) {
    const category = await trpcClient.products.categories.getCategoryByName.query(form.category);

    title = category.label
  } else {
    title = 'Products';
  }

  return (
    <Container className='mx-auto py-16'>
      <h1 className='mb-8 font-bold text-3xl text-gray-800'>
        {title}
      </h1>

      <ProductsSearchForm form={form} className='w-2/4' />

      <ProductReels
        className='mt-20'
        category={form.category}
        sortBy={form.sortBy}
        sortDir={form.sortDir}
      />
    </Container>
  );
}
