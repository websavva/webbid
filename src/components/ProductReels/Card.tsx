import Link from 'next/link';

import type { Product } from '#server/cms/collections/types';

import type { DefineProps } from '@/types';
import { formatPrice } from '@/lib/formatters';

import { ImageSlider } from '../ImageSlider';
import { cn } from '@/lib/utils/cn';
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
      <Skeleton className='h-44 mb-6 w-full' />

      <Skeleton className='w-full h-5 mb-2' />

      <Skeleton className='w-1/2 h-5 mb-2' />

      <Skeleton className='w-1/3 h-5' />

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
          className='h-72 mb-6 lg:max-w-none'
        />
      )}

      <div className='flex-grow lg:ml-0'>
        <div className='mb-2 text-xl font-semibold line-clamp-1'>{name}</div>

        {categoryLabel && (
          <div className='mb-2 text-gray-500 font-medium text-base'>
            {categoryLabel}
          </div>
        )}

        <div className='sm:max-lg:text-xl text-lg font-medium'>
          {formatPrice(price)}
        </div>
      </div>
    </Link>
  );
};
