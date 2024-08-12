'use client';

import type { Product } from '#server/cms/collections/types';

import { cn } from '@/lib/utils/cn';
import type { DefineProps } from '@/types';

import { Separator } from '../UI/Separator';
import { ProductCard } from '../ProductCard';
import { OrderBill } from '../OrderBill';

export type OrderInfoProps = DefineProps<{
  order: import('#server/cms/collections/types').Order;
}>;

export const OrderInfo = ({ order, className, ...attrs }: OrderInfoProps) => {
  const {
    id,

    products,
    isPaid,

    user,
  } = order;

  const normalizedProducts = products.filter(
    (product) => product && typeof product !== 'number'
  ) as Product[];

  return (
    <div {...attrs} className={cn('flex flex-col', className)}>
      <span className='text-muted-foreground'>Order nr.</span>

      <span className='font-bold text-gray-700 text-xl mt-3'>{id}</span>

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

      <div className='mt-12 flex justify-between max-w-[500px]'>
        <div>
          <div className='mb-1 font-semibold text-lg'>Order Status</div>

          <div className='font-semibold text-muted-foreground'>
            {isPaid ? 'Payment successful' : 'Pending payment'}
          </div>
        </div>

        {user && typeof user === 'object' && (
          <div>
            <div className='mb-1 font-semibold text-lg'>Delivered To</div>

            <div className='font-semibold text-muted-foreground'>
              {user.email}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
