import { notFound } from 'next/navigation';

import { trpcClient } from '@/lib/trpc';
import type { PagePropsWithParams } from '@/types/page-props';

import { BreadcrumbItem, Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/Container';

const breadcrumbItems: BreadcrumbItem[] = [
  {
    href: '/',
    name: 'Home',
  },
  {
    name: 'Products',
  },
];

export default async function ProductPage({
  params: { id: productId },
}: PagePropsWithParams<{
  id: string;
}>) {
  // id validation
  if (isNaN(+productId)) notFound();

  const product = await trpcClient.products.getProductById.query(+productId);

  if (!product) notFound();

  const { name: title } = product;


  return (
    <Container className='py-12 mx-auto'>
      <Breadcrumbs items={breadcrumbItems} className='text-gray-600' />

      <h1 className='mt-6 text-3xl font-bold'>{title}</h1>
    </Container>
  );
}
