'use client';

import type { Product } from '#server/cms/collections/types';

import { cn } from '@/lib/utils/cn';
import type { DefineProps } from '@/types';
import type { Order } from '#server/cms/collections/types';

import { Separator } from '../UI/Separator';
import { ProductCard } from '../ProductCard';
import { OrderBill } from '../OrderBill';
import { OrderStatusBadge } from '../OrderStatusBadge';

export type OrderInfoProps = DefineProps<{
  order: Order;
}>;

export const OrderInfo = ({ order, className, ...attrs }: OrderInfoProps) => {
  const {
    id,

    products,
    isPaid,
    status,
    user,
  } = order;

  const normalizedProducts = products.filter(
    (product) => product && typeof product !== 'number',
  ) as Product[];

  return (
    <div {...attrs} className={cn('flex flex-col', className)}>
      <span className='text-muted-foreground'>Order nr.</span>

      <span className='mt-3 text-xl font-bold text-gray-700'>{id}</span>

      <Separator className='my-8' />

      <div className='flex flex-col space-y-8'>
        {normalizedProducts.map((product) => {
          return (
            <ProductCard
              key={product.id}
              canBeDownloaded={isPaid}
              product={product}
            />
          );
        })}
      </div>

      <Separator className='my-8' />

      <OrderBill products={normalizedProducts} />

      <div className='mt-5 flex max-w-[500px] max-md:flex-col md:mt-12 md:justify-between'>
        <div>
          <div className='mb-1 text-lg font-semibold'>Order Status</div>

          <OrderStatusBadge status={status} />
        </div>

        {user && typeof user === 'object' && (
          <div className='max-md:mt-5'>
            <div className='mb-1 text-lg font-semibold'>Delivered To</div>

            <div className='font-semibold text-muted-foreground'>
              {user.email}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
