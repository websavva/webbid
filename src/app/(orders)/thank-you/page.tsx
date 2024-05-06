import { notFound, redirect } from 'next/navigation';
import { ArrowRightIcon } from 'lucide-react';
import { headers } from 'next/headers';

import { loadAuthContext } from '@/contexts/auth/load';
import { trpcClient } from '@/lib/trpc';
import { requestHeaders } from '@/lib/utils/request-headers';
import { toArray } from '@/lib/utils/to-array';
import { PagePropsWithSearchParams } from '@/types/page-props';
import { SuccessfulPaymentIcon } from '@/components/ui/icons/SuccessfulPaymentIcon';
import { Container } from '@/components/ui/Container';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { OrderIntro } from '@/components/OrderIntro';

export default async function ThankYoutPage({
  searchParams,
}: PagePropsWithSearchParams<'orderId'>) {
  const orderId = Number(toArray(searchParams.orderId)[0]) || null;

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

  const didUserComeFromStripe = /stripe\.com/.test(
    headers().get('referer') || ''
  );

  return (
    <Container className='mx-auto py-16 flex items-start justify-between'>
      <div className='flex-1'>
        <div className='text-blue-600 font-bold mb-5'>Order successful</div>

        <h1 className='text-4xl font-bold'>Thanks for ordering</h1>

        <p className='mt-5 text-base text-muted-foreground max-w-[500px] leading-relaxed'>
          {order._isPaid ? (
            <>
              Your order was processed and your assets are available to download
              below. We&apos;ve sent your receipt and order details to{' '}
              {order.user && typeof order.user !== 'number' ? (
                <span className='font-medium text-gray-900'>
                  {order.user.email}
                </span>
              ) : null}
              .
            </>
          ) : (
            <>
              We appreciate your order, and we&apos;re currently processing it.
              So hang tight and we&apos;ll send you confirmation very soon!
            </>
          )}
        </p>

        <OrderIntro
          order={order}
          watchStatus={!order._isPaid}
          shouldEmptyOutCartCartOnMount={didUserComeFromStripe}
          className='mt-12'
        />

        <ArrowLink href='/products' className='mt-8 text-base justify-end'>
          Continue Shopping
        </ArrowLink>
      </div>

      <SuccessfulPaymentIcon className='flex-[0_0_40%]' />
    </Container>
  );
}
