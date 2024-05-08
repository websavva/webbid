import { z } from 'zod';
import { defu } from 'defu';

import {
  type GetProductsQuery,
  GetProductsQuerySchema,
} from '#server/dtos/products';
import type { PagePropsWithSearchParams } from '@/types/page-props';

const ProductsPageFormSchema = GetProductsQuerySchema.pick({
  category: true,
  page: true,
  sortDir: true,
  sortBy: true,
}).partial().transform((query) => defu(query, {
  page: 1,
  sortD
}));

type ProductsPageForm = z.infer<typeof ProductsPageFormSchema>;

type ProductsPageProps = PagePropsWithSearchParams<keyof ProductsPageForm>

export default async function ProductsPage({
  searchParams: query
}: ProductsPageProps) {
  const form =
}
