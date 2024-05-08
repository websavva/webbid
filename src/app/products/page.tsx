
import type { PagePropsWithSearchParams } from '@/types/page-props';
import { ProductsSearchForm } from '@/components/ProductsSearchForm';
import { Container } from '@/components/ui/Container';
import { ProductReels } from '@/components/ProductReels';

import {
  type ProductsPageSearchParams,
  ProductsPageSearchParamsSchema,
} from './config';

export default function ProductsPage({
  searchParams: query,
}: PagePropsWithSearchParams<keyof ProductsPageSearchParams>) {

  const {
    page,

    ...form
  } = ProductsPageSearchParamsSchema.parse(query);

  return (
    <Container className='mx-auto py-20'>
      <ProductsSearchForm form={form} />

      <ProductReels className='mt-16'/>
    </Container>
  );
}
