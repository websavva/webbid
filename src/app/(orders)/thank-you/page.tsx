import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';

import { trpcClient } from '@/lib/trpc';
import { requestHeaders } from '@/lib/utils/request-headers';
import { toArray } from '@/lib/utils/to-array';
import type { PagePropsWithSearchParams } from '@/types/page-props';
import { SuccessfulPaymentIcon } from '@/components/Icons/SuccessfulPaymentIcon';
import { Container } from '@/components/UI/Container';
import { ArrowLink } from '@/components/UI/ArrowLink';
import { OrderIntro } from '@/components/OrderIntro';

export const middlewars = ['auth'];

export const metadata: Metadata = {
  title: 'Thank You For Your Order',

  robots: {
    index: false,
    follow: false,
  },
};

export const middlewares = ['auth'];

export default async function ThankYouPage({
  searchParams,
}: PagePropsWithSearchParams<'orderId'>) {
  const orderId = Number(toArray(searchParams.orderId)[0]) || null;

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

  const didUserComeFromStripe = /stripe\.com/.test(
    headers().get('referer') || '',
  );

  return (
    <Container className='mx-auto flex justify-between py-16 max-md:flex-col-reverse md:items-start'>
      <div className='md:flex-1'>
        <div className='mb-5 font-bold text-blue-600'>Order successful</div>

        <h1 className='text-4xl font-bold'>Thanks for ordering</h1>

        <p className='mt-5 max-w-[500px] text-base leading-relaxed text-muted-foreground'>
          {order.isPaid ? (
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
          watchStatus={!order.isPaid}
          shouldEmptyOutCartCartOnMount={didUserComeFromStripe}
          className='mt-12'
        />

        <ArrowLink href='/products' className='mt-8 justify-end text-base'>
          Continue Shopping
        </ArrowLink>
      </div>

      <SuccessfulPaymentIcon className='max-md:hidden md:flex-[0_0_40%]' />
    </Container>
  );
}
