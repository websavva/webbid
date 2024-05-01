'use client';

import { XIcon } from 'lucide-react';
import Image from 'next/image';

import type { Product } from '#server/cms/collections/types';
import { cn } from '@/lib/utils/cn';
import { DefineProps } from '@/types';

import { formatPrice } from '@/lib/formatters';
import { Skeleton } from '../ui/Skeleton';

export type CartItemProps = DefineProps<{
  item: Product;

  onRemove: () => any;
}>;

export const CartItemSkeleton = ({ className, ...attrs }: DefineProps<{}>) => {
  return (
    <div {...attrs} className={cn('w-full h-32 flex items-start', className)}>
      <Skeleton className='size-32 mr-5' />

      <div className='flex-1'>
        <Skeleton className='h-4 w-full mb-3' />

        <Skeleton className='h-4 w-2/4 mb-4' />

        <Skeleton className='h-4 w-1/4' />
      </div>
    </div>
  );
};

export const CartItem = ({
  item,

  onRemove,

  className,
  ...attrs
}: CartItemProps) => {
  const {
    imageUrls: { 0: thumbnailUrl = '' },

    categoryLabel,

    name,

    price,
  } = item;

  return (
    <div {...attrs} className={cn('flex items-start', className)}>
      {thumbnailUrl && (
        <Image
          src={thumbnailUrl}
          alt=''
          width={8e2}
          height={8e2}
          className='size-32 object-cover mr-5 rounded-lg'
        />
      )}

      <div className='flex-1'>
        <div className='font-bold'>{name}</div>

        {categoryLabel && (
          <div className='text-gray-600 text-sm mt-2 font-medium'>
            {categoryLabel}
          </div>
        )}

        <button
          className='flex items-center mt-3 text-sm font-semibold text-gray-500'
          onClick={onRemove}
        >
          <span>Remove</span>

          <XIcon className='size-[1em] ml-1' />
        </button>
      </div>

      <div className='ml-2'>{formatPrice(price)}</div>
    </div>
  );
};
