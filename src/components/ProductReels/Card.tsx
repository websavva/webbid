import Link from 'next/link';

import type { Product } from '#server/cms/collections/types';

import type { DefineProps } from '@/types';
import { formatPrice } from '@/lib/formatters';

import { cn } from '@/lib/utils/cn';

import { ImageSlider } from '../ImageSlider';
import { Skeleton } from '../UI/Skeleton';

export type ProductCardProps = DefineProps<
  {
    product: Product;
  },
  HTMLAnchorElement
>;

export const ProductReelsCardSkeleton = ({ className }: DefineProps<{}>) => {
  return (
    <div className={cn(className)}>
      <Skeleton className='mb-6 h-44 w-full' />

      <Skeleton className='mb-2 h-5 w-full' />

      <Skeleton className='mb-2 h-5 w-1/2' />

      <Skeleton className='h-5 w-1/3' />

      <Skeleton />
    </div>
  );
};

export const ProductReelsCard = ({
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
    <Link
      {...attrs}
      href={`/products/${id}`}
      className={cn('flex flex-col', className)}
    >
      {imageUrls.length && (
        <ImageSlider
          imageUrls={imageUrls}
          className='mb-6 h-72 lg:max-w-none'
        />
      )}

      <div className='grow lg:ml-0'>
        <div className='mb-2 line-clamp-1 text-xl font-semibold'>{name}</div>

        {categoryLabel && (
          <div className='mb-2 text-base font-medium text-gray-500'>
            {categoryLabel}
          </div>
        )}

        <div className='text-lg font-medium sm:max-lg:text-xl'>
          {formatPrice(price)}
        </div>
      </div>
    </Link>
  );
};
