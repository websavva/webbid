import Link from 'next/link';

import type { Product } from '#server/cms/collections/types';

import type { DefineProps } from '@/types';
import { formatPrice } from '@/lib/formatters';

import { ImageSlider } from '../ImageSlider';
import { cn } from '@/lib/utils/cn';
import { Skeleton } from '../UI/Skeleton';

export type ProductCardProps = DefineProps<{
  product: Product;
}>;

export const ProductCardSkeleton = ({ className }: DefineProps<{}>) => {
  return (
    <div className={cn(className)}>
      <Skeleton className='h-44 mb-6 w-full' />

      <Skeleton className='w-full h-5 mb-2' />

      <Skeleton className='w-1/2 h-5 mb-2' />

      <Skeleton className='w-1/3 h-5' />

      <Skeleton />
    </div>
  );
};

export const ProductCard = ({
  product,
  className,
  ...attrs
}: ProductCardProps) => {
  const {
    id,
    name,
    price,
    categoryLabel,

    imageUrls,
  } = product;

  return (
    <div {...attrs} className={cn('flex flex-row lg:flex-col', className)}>
      {imageUrls.length && (
        <ImageSlider imageUrls={imageUrls} className='h-72 mb-6 max-w-80 lg:max-w-none' />
      )}

      <div className='flex-grow ml-12 lg:ml-0'>
        <Link
          href={`/products/${id}`}
          className='mb-6 lg:mb-2 text-xl font-semibold line-clamp-1'
        >
          {name}
        </Link>

        {categoryLabel && (
          <div className='mb-6 lg:mb-2 text-gray-500 font-medium text-xl lg:text-base'>
            {categoryLabel}
          </div>
        )}

        <div className='text-xl lg:text-lg font-medium'>{formatPrice(price)}</div>
      </div>
    </div>
  );
};
