import Image from 'next/image';
import Link from 'next/link';
import { ExternalLinkIcon } from 'lucide-react';

import type { Order } from '#server/cms/collections/types';

import { calculatOrderSum } from '@/lib/utils/finance/calculate-order-sum';
import type { DefineProps } from '@/types';
import { cn } from '@/lib/utils/cn';
import { OrderStatus } from '@/consts/order-status';
import { formatPrice } from '@/lib/formatters';

import { OrderStatusBadge } from '../OrderStatusBadge';

export type OrderCardProps = DefineProps<{ order: Order }, HTMLAnchorElement>;

export const OrderCard = ({ className, order, ...attrs }: OrderCardProps) => {
  const {
    id,

    products,
    status,

    createdAt,
  } = order;
  const validProducts = order.products.filter(
    (product) => typeof product !== 'number'
  );

  const [thumbnailUrl] = validProducts
    .map((product) => product.imageUrls)
    .flat();

  const { totalPrice } = calculatOrderSum(validProducts);

  const formattedCreatedAt = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(new Date(createdAt));

  return (
    <Link
      href={`/orders/${id}`}
      {...attrs}
      className={cn(
        'flex p-5 rounded-2xl transition duration-300 border shadow-sm border-slate-300',
        className
      )}
    >
      {thumbnailUrl && (
        <Image
          src={thumbnailUrl}
          alt=''
          width={500}
          height={500}
          className='object-cover size-44 mr-10'
        />
      )}

      <div className='flex-1'>
        <div className='flex items-center justify-between flex-1'>
          <div className='text-xl font-semibold text-gray-800'>
            <span>ID: </span>

            <span>{id}</span>
          </div>

          <span className='text-lg font-semibold text-gray-500'>
            {formatPrice(totalPrice)}
          </span>
        </div>

        <div className='text-base mt-3 text-muted-foreground'>
          {formattedCreatedAt}
        </div>

        <OrderStatusBadge status={status as OrderStatus} className='mt-5' />

        <div className='mt-8 text-primary flex items-center space-x-2'>
          <ExternalLinkIcon className='size-[1em]' />

          <span>
            View
          </span>
        </div>
      </div>
    </Link>
  );
};
