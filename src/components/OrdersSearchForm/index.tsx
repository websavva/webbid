'use client';

import { withQuery } from 'ufo';
import { usePathname, useRouter } from 'next/navigation';

import type { GetOrdersQuery } from '#server/dtos/orders';
import type { DefineProps } from '@/types';
import type { OrderStatus } from '@/consts/order-status';
import { transformFormToQuery } from '@/lib/utils/transform-from-to-query';

import { OrderStatusSelect } from '../OrderStatusSelect';

export type OrdersSearchFormProps = DefineProps<
  Pick<GetOrdersQuery, 'status'>,
  HTMLFormElement
>;

export const OrdersSearchForm = ({
  status,
  ...attrs
}: OrdersSearchFormProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const onStatusChange = (status: OrderStatus | undefined) => {
    const updatedQuery = transformFormToQuery(
      {
        status,
      },
      {
        status: undefined,
      },
    );

    const updatedHref = withQuery(pathname, updatedQuery);

    router.push(updatedHref);
  };
  return (
    <form {...attrs}>
      <OrderStatusSelect status={status} onChange={onStatusChange} />
    </form>
  );
};
