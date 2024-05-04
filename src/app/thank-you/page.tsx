import { loadAuthContext } from '@/contexts/auth/load';
import { trpcClient } from '@/lib/trpc';
import { requestHeaders } from '@/lib/utils/request-headers';
import { toArray } from '@/lib/utils/to-array';
import { PagePropsWithSearchParams } from '@/types/page-props';
import { notFound, redirect } from 'next/navigation';

export async function ThankYoutPage({
  searchParams,
}: PagePropsWithSearchParams<'orderId'>) {
  const orderId = Number(toArray(searchParams.orderId)[0]) || null;

  if (!orderId) notFound();

  // auth middleware
  const { user } = await loadAuthContext(requestHeaders());

  if (!user) return redirect('/login');

  const order = await trpcClient.orders.getOrder.query({
    orderId,
  });



  return <div></div>;
}
