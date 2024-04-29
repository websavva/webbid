'use client';

import { ShoppingBasketIcon } from 'lucide-react';
import Link from 'next/link';

import { useCart } from '@/hooks/use-cart';
import type { DefineProps } from '@/types';
import { useAuth } from '@/hooks/use-auth';

import { Button } from '../ui/Button';
import { Separator } from '../ui/Separator';

import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';

export type CartProps = DefineProps<{}>;

export const Cart = (attrs: CartProps = {}) => {
  const {
    items,

    items: { length: itemsCount },

    removeItem,
  } = useCart();

  const { isGuest } = useAuth();

  return (
    <div {...attrs}>
      <div className='font-medium text-[1.1em]'>Shopping Cart</div>

      {itemsCount > 0 && (
        <>
          <div>
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

          <Separator />

          <CartSummary items={items} />

          <Button>Continue to Checkout</Button>
        </>
      )}

      {itemsCount === 0 && (
        <>
          <div className='mt-8 mb-2 text-center flex flex-col items-center text-slate-500'>
            <ShoppingBasketIcon className='w-14 h-14 mb-5' />
          </div>

          <Link
            href='/login'
            className='mx-auto hover:underline text-lg text-blue-500'
          >
            Go to catalog
          </Link>
        </>
      )}
    </div>
  );
};
