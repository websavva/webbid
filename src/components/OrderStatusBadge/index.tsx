import { cva, type VariantProps } from 'class-variance-authority';

import { OrderStatus } from '@/consts/order-status';
import type { DefineProps } from '@/types';
import { cn } from '@/lib/utils/cn';
import { firstToUpperCase } from '@/lib/utils/first-to-upper-case';

const orderStatusBadgeVariants = cva(
  'w-max px-3 py-1 rounded-2xl leading-none text-sm font-semibold',
  {
    variants: {
      status: {
        [OrderStatus.Processing]: 'bg-gray-200 text-gray-700',
        [OrderStatus.Canceled]: 'bg-red-200 text-red-900',
        [OrderStatus.Success]: 'bg-green-200 text-green-900',
      },
    },
    defaultVariants: {
      status: OrderStatus.Processing,
    },
  },
);

export type OrderStatusBadgeProps = DefineProps<
  VariantProps<typeof orderStatusBadgeVariants>
>;

export const OrderStatusBadge = ({
  status,
  className,
  ...attrs
}: OrderStatusBadgeProps) => {
  const label = firstToUpperCase(status!);

  return (
    <div
      {...attrs}
      className={cn(orderStatusBadgeVariants({ status, className }))}
    >
      {label}
    </div>
  );
};
