import { Container } from '@/components/ui/Container';
import { trpcClient } from '@/lib/trpc';
import { requestHeaders } from '@/lib/utils/request-headers';

import { OrderCard } from '@/components/OrderCard';

export default async function OrdersPage() {
  const { orders } = await trpcClient.orders.getOrders.query(
    {},
    {
      context: {
        headers: requestHeaders(),
      },
    }
  );

  return (
    <Container className='mx-auto py-16 px-16'>
      <h1 className='text-3xl font-bold text-gray-800 mb-12'>My Orders</h1>

      <div>
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </Container>
  );
}
