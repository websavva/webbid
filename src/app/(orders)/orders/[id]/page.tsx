import { notFound, redirect } from 'next/navigation';

import { loadAuthContext } from '@/contexts/auth/load';
import { trpcClient } from '@/lib/trpc';
import { requestHeaders } from '@/lib/utils/request-headers';
import { PagePropsWithParams } from '@/types/page-props';
import { Container } from '@/components/ui/Container';
import { OrderIntro } from '@/components/OrderIntro';

export default async function ThankYoutPage({
  params,
}: PagePropsWithParams<{ id: string }>) {
  const orderId = params.id ? Number(params.id) : null;

  if (!orderId) notFound();

  const filteredHeaders = requestHeaders();

  // auth middleware
  const { user } = await loadAuthContext(filteredHeaders);

  if (!user) return redirect('/login');

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
