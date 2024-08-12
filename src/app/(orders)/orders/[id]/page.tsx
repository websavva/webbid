import { notFound } from 'next/navigation';

import { trpcClient } from '@/lib/trpc';
import { requestHeaders } from '@/lib/utils/request-headers';
import { PagePropsWithParams } from '@/types/page-props';
import { Container } from '@/components/UI/Container';
import { OrderIntro } from '@/components/OrderIntro';
import { applyGuards } from '@/lib/utils/guards';
import { auth } from '@/guards/auth';

export default async function ThankYoutPage({
  params,
}: PagePropsWithParams<{ id: string }>) {
  const orderId = params.id ? Number(params.id) : null;

  if (!orderId) notFound();

  await applyGuards(auth);

  const filteredHeaders = requestHeaders();

  const order = await trpcClient.orders.getOrder.query(
    {
      orderId,
    },
    {
      context: {
        headers: filteredHeaders,
      },
    }
  );

  return (
    <Container className='mx-auto pt-8 pb-16 max-w-4xl'>
      <OrderIntro order={order} watchStatus={!order.isPaid} className='mt-12' />
    </Container>
  );
}
