'use client';

import { XIcon } from 'lucide-react';
import Image from 'next/image';

import type { Product } from '#server/cms/collections/types';
import { cn } from '@/lib/utils/cn';
import type { DefineProps } from '@/types';

import { formatPrice } from '@/lib/formatters';

import { Skeleton } from '../UI/Skeleton';

export type ProductCardProps = DefineProps<{
  product: Product;

  canBeRemoved?: boolean;
  canBeDownloaded?: boolean;

  onRemove?: () => any;
}>;

export const ProductCardSkeleton = ({
  className,
  ...attrs
}: DefineProps<{}>) => {
  return (
    <div {...attrs} className={cn('flex h-32 w-full items-start', className)}>
      <Skeleton className='mr-5 size-32' />

      <div className='flex-1'>
        <Skeleton className='mb-3 h-4 w-full' />

        <Skeleton className='mb-4 h-4 w-2/4' />

        <Skeleton className='h-4 w-1/4' />
      </div>
    </div>
  );
};

export const ProductCard = ({
  product,

  canBeRemoved,
  canBeDownloaded,

  onRemove,

  className,
  ...attrs
}: ProductCardProps) => {
  const {
    imageUrls: { 0: thumbnailUrl = '' },

    categoryLabel,

    name,

    price,
    productFile,
  } = product;

  return (
    <div
      {...attrs}
      className={cn(
        'grid grid-cols-[auto_1fr] grid-rows-[auto_auto] gap-y-4 sm:grid-cols-[auto_1fr_max-content] sm:grid-rows-1',
        className,
      )}
    >
      {thumbnailUrl && (
        <Image
          src={thumbnailUrl}
          alt=''
          width={8e2}
          height={8e2}
          className='mr-5 size-32 rounded-lg object-cover max-sm:row-start-1 max-sm:row-end-3'
        />
      )}

      <div className='grid'>
        <div className='max-w-full truncate font-bold'>{name}</div>

        {categoryLabel && (
          <div className='mt-2 text-sm font-medium text-gray-600'>
            {categoryLabel}
          </div>
        )}

        {canBeRemoved && (
          <button
            className='mt-3 flex items-center text-sm font-semibold text-gray-500'
            onClick={onRemove}
          >
            <span>Remove</span>

            <XIcon className='ml-1 size-[1em]' />
          </button>
        )}

        {canBeDownloaded && productFile && typeof productFile === 'object' && (
          <a
            download={product.name}
            href={productFile.url!}
            className='mt-3 block cursor-pointer text-sm font-semibold text-blue-600'
          >
            Download Asset
          </a>
        )}
      </div>

      <div className='sm:ml-2'>{formatPrice(price)}</div>
    </div>
  );
};
