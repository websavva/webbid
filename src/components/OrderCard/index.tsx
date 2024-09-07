import Image from 'next/image';
import Link from 'next/link';
import { ExternalLinkIcon } from 'lucide-react';

import type { Order, Product } from '#server/cms/collections/types';

import { calculatOrderSum } from '@/lib/utils/finance/calculate-order-sum';
import type { DefineProps } from '@/types';
import { cn } from '@/lib/utils/cn';
import type { OrderStatus } from '@/consts/order-status';
import { formatPrice } from '@/lib/formatters';

import { OrderStatusBadge } from '../OrderStatusBadge';

export type OrderCardProps = DefineProps<{ order: Order }, HTMLAnchorElement>;

export const OrderCard = ({ className, order, ...attrs }: OrderCardProps) => {
  const {
    id,

    status,

    createdAt,
  } = order;
  const validProducts = order.products.filter(
    (product) => typeof product !== 'number',
  ) as Product[];

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
        'flex rounded-2xl border border-slate-300 shadow-sm transition duration-300 max-sm:flex-col max-sm:overflow-hidden md:p-5',
        className,
      )}
    >
      {thumbnailUrl && (
        <Image
          src={thumbnailUrl}
          alt=''
          width={500}
          height={500}
          className='max-h-44 object-cover sm:mr-10 sm:size-44 sm:rounded-md'
        />
      )}

      <div className='flex-1 max-sm:px-3 max-sm:py-5'>
        <div className='flex flex-1 max-sm:flex-col max-sm:space-y-3 sm:items-center sm:justify-between'>
          <div className='text-xl font-semibold text-gray-800'>
            <span>ID: </span>

            <span>{id}</span>
          </div>

          <span className='text-lg font-semibold text-gray-500'>
            {formatPrice(totalPrice)}
          </span>
        </div>

        <div className='mt-3 text-base text-muted-foreground'>
          {formattedCreatedAt}
        </div>

        <OrderStatusBadge
          status={status as OrderStatus}
          className='mt-3 sm:mt-5'
        />

        <div className='mt-5 flex items-center space-x-2 text-primary sm:mt-8'>
          <ExternalLinkIcon className='size-[1em]' />

          <span>View</span>
        </div>
      </div>
    </Link>
  );
};
