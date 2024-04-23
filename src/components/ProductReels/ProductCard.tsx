import Link from 'next/link';

import type { Product } from '#server/cms/collections/types';

import type { DefineProps } from '@/types';
import { formatPrice } from '@/lib/formatters';

import { ImageSlider } from '../ImageSlider';
import { cn } from '@/lib/utils/cn';
import { Skeleton } from '../ui/Skeleton';

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
    category,

    images,
  } = product;

  const imageUrls = images
    .map(({ image }) => {
      if (typeof image === 'object' && image.url) {
        return image.url!;
      } else {
        return null;
      }
    })
    .filter(Boolean) as string[];

  const categoryLabel = typeof category === 'object' && category?.label;

  return (
    <div {...attrs} className={cn('', className)}>
      {imageUrls.length && (
        <ImageSlider imageUrls={imageUrls} className='h-72 mb-6' />
      )}

      <Link href={`/products/${id}`} className='mb-2 text-xl font-semibold'>
        {name}
      </Link>

      {categoryLabel && (
        <div className='text-gray-500 font-medium text-base mb-2'>
          {categoryLabel}
        </div>
      )}

      <div className='text-lg font-medium'>{formatPrice(price)}</div>
    </div>
  );
};
