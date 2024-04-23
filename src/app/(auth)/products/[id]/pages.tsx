import { trpcClient } from '@/lib/trpc';
import type { PagePropsWithParams } from '@/types/page-props';

export default async function ProductPage({
  params: { id: productId },
}: PagePropsWithParams<{
  id: string;
}>) {
  const product = await trpcClient.products.getProductById.query(+productId);
}
