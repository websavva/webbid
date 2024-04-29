'use client';

import { XIcon } from 'lucide-react';
import Image from 'next/image';

import type { Product } from '#server/cms/collections/types';
import { cn } from '@/lib/utils/cn';
import { DefineProps } from '@/types';

import { Button } from '../ui/Button';
import { formatPrice } from '@/lib/formatters';

export type CartItemProps = DefineProps<{
  item: Product;

  onRemove: () => any;
}>;

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
    <div {...attrs} className={cn('', className)}>
      {thumbnailUrl && (
        <Image
          src={thumbnailUrl}
          alt=''
          width={8e2}
          height={8e2}
          className='w-auto h-auto min-h-28'
        />
      )}

      <div>
        <div>{name}</div>

        {categoryLabel && <div>{categoryLabel}</div>}

        <Button size='sm' variant='ghost' onClick={onRemove}>
          Remove
          <XIcon />
        </Button>
      </div>

      <div>{formatPrice(price)}</div>
    </div>
  );
};
