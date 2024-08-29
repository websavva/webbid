import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { trpcClient } from '@/lib/trpc';
import { requestHeaders } from '@/lib/utils/request-headers';
import { PagePropsWithParams } from '@/types/page-props';
import { Container } from '@/components/UI/Container';
import { OrderIntro } from '@/components/OrderIntro';

type OrderPageProps = PagePropsWithParams<{ id: string }>;

export function generateMetadata({ params: { id } }: OrderPageProps): Metadata {
  return {
    title: `Order ${id}`,

    robots: {
      index: false,
      follow: false,
    },
  };
}

export const middlewares = ['auth'];

export default async function OrderPage({ params }: OrderPageProps) {
  const orderId = params.id ? Number(params.id) : null;

  if (!orderId) notFound();

  const filteredHeaders = requestHeaders();

  const order = await trpcClient.orders.getOrder.query(
    {
      orderId,
    },
    {
      context: {
        headers: filteredHeaders,
      },
    },
  );

  return (
    <Container className='mx-auto py-10 md:py-16 md:max-w-4xl'>
      <OrderIntro order={order} watchStatus={!order.isPaid} />
    </Container>
  );
}
