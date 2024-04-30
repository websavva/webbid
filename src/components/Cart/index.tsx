'use client';

import { ShoppingBasketIcon } from 'lucide-react';
import Link from 'next/link';

import { useCart } from '@/hooks/use-cart';
import type { DefineProps } from '@/types';

import { CartCompositionIcon } from '../ui/icons/CartCompositionIcon';
import { Button } from '../ui/Button';
import { Separator } from '../ui/Separator';

import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';

export type CartProps = DefineProps<{
  isPage?: boolean;
}>;

export const Cart = ({
  isPage,

  ...attrs
}: CartProps = {}) => {
  const {
    items,

    items: { length: itemsCount },

    removeItem,
  } = useCart();

  return (
    <div {...attrs}>
      <div className='font-bold text-[1.2em] mb-8'>Shopping Cart ({itemsCount})</div>

      {itemsCount > 0 && (
        <>
          <div className='space-y-6 max-h-[25rem] overflow-auto'>
            {items.map((item) => {
              return (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={() => removeItem(item.id)}
                />
              );
            })}
          </div>

          <Separator className='my-5' />

          <CartSummary items={items} />

          <Button asChild>
            <Link href='/cart' className='w-full mt-5'>
              Continue to Checkout
            </Link>
          </Button>
        </>
      )}

      {itemsCount === 0 && (
        <div>
          <div className='mt-8 mb-12 text-center flex flex-col items-center text-slate-400'>
            <CartCompositionIcon className='w-1/2 h-auto' />
          </div>

          <div className='flex flex-col text-center items-center text-xl'>
            <div className='font-semibold text-gray-600 mb-5'>
              Cart is empty...
            </div>

            <Link
              href='/products'
              className='hover:underline text-blue-500 text-base'
            >
              Go to catalog
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
