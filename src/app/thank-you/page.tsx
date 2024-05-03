import { toArray } from '@/lib/utils/to-array';
import { PagePropsWithSearchParams } from '@/types/page-props';
import { notFound } from 'next/navigation';

export function ThankYoutPage({
  searchParams,
}: PagePropsWithSearchParams<'orderId'>) {
  const orderId = Number(toArray(searchParams.orderId)[0]) || null;

  if (!orderId) notFound();

  return <div>

  </div>
}
