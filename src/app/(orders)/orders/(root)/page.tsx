import { Container } from '@/components/ui/Container';
import { trpcClient } from '@/lib/trpc';
import { requestHeaders } from '@/lib/utils/request-headers';
import { OrderCard } from '@/components/OrderCard';
import { OrdersSearchForm } from '@/components/OrdersSearchForm';
import { Pagination } from '@/components/ui/Pagination';
import type { PagePropsWithSearchParams } from '@/types/page-props';

import {
  type OrdersPageSearchParams,
  OrdersPageSearchParamsSchema,
  ORDERS_PER_PAGE,
} from './config';
import { applyGuards } from '@/lib/utils/guards';
import { auth } from '@/guards/auth';

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
    }
  );

  return (
    <Container className='mx-auto py-16 px-16'>
      <h1 className='text-3xl font-bold text-gray-800 mb-12'>My Orders</h1>

      <OrdersSearchForm status={status} className='w-1/4' />

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
