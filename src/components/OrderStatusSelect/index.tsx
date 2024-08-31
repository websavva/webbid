'use client';

import type { DefineProps } from '@/types';

import { OrderStatus } from '@/consts/order-status';
import { firstToUpperCase } from '@/lib/utils/first-to-upper-case';

import { Select } from '../UI/Select';

export type OrderStatusSelectProps = Omit<
  DefineProps<
    {
      status: OrderStatus | undefined;
    },
    HTMLButtonElement
  >,
  'onChange'
> & {
  onChange: (status: OrderStatus | undefined) => any;
};

const OPTIONS = Object.values(OrderStatus).map((id) => ({
  id,
  label: firstToUpperCase(id),
}));

export const OrderStatusSelect = ({
  status,
  onChange,

  ...attrs
}: OrderStatusSelectProps) => {
  return (
    <Select
      {...attrs}
      value={status}
      onChange={onChange}
      options={OPTIONS}
      canBeEmpty
      emptyLabel='All Statuses'
    />
  );
};
