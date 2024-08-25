import type { Metadata } from 'next';

import { Container } from '@/components/UI/Container';
import { trpcClient } from '@/lib/trpc';
import { requestHeaders } from '@/lib/utils/request-headers';
import { OrderCard } from '@/components/OrderCard';
import { OrdersSearchForm } from '@/components/OrdersSearchForm';
import { Pagination } from '@/components/UI/Pagination';
import type { PagePropsWithSearchParams } from '@/types/page-props';

import {
  type OrdersPageSearchParams,
  OrdersPageSearchParamsSchema,
  ORDERS_PER_PAGE,
} from './config';
import { applyGuards } from '@/lib/utils/guards';
import { auth } from '@/guards/auth';

export const metadata: Metadata = {
  title: 'Your Orders',

  robots: {
    index: false,
    follow: false,
  },
};

export default async function OrdersPage({
  searchParams,
}: PagePropsWithSearchParams<keyof OrdersPageSearchParams>) {
  await applyGuards(auth);

  const query = OrdersPageSearchParamsSchema.parse(searchParams);

  const {
    status,

    page,
  } = query;

  const { orders, paginationMeta } = await trpcClient.orders.getOrders.query(
    {
      status,

      page,
      perPage: ORDERS_PER_PAGE,
    },
    {
      context: {
        headers: requestHeaders(),
      },
    },
  );

  return (
    <Container className='mx-auto py-10 md:py-16 md:px-16'>
      <h1 className='text-3xl font-bold text-gray-800 mb-12'>My Orders</h1>

      <OrdersSearchForm status={status} className='xs:w-1/2 md:w-1/4' />

      <div className='mt-8'>
        {orders.length > 0 ? (
          <div className='flex flex-col space-y-5'>
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <span className='text-lg text-muted-foreground'>
            No orders were found ...
          </span>
        )}
      </div>

      {paginationMeta!.pagesCount > 1 && (
        <Pagination
          page={paginationMeta!.page}
          pagesCount={paginationMeta!.pagesCount}
          className='mt-12'
        />
      )}
    </Container>
  );
}
