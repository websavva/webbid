'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import flatry from 'await-to-js';

import { useCartStore } from '@/hooks/use-cart-store';
import type { DefineProps } from '@/types';
import { trpcClient } from '@/lib/trpc';

import { CartCompositionIcon } from '../ui/icons/CartCompositionIcon';
import { Button } from '../ui/Button';
import { Separator } from '../ui/Separator';

import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';
import { wait } from '@/lib/utils/wait';

export type CartProps = DefineProps<{
  isPage?: boolean;
}>;

export const Cart = ({
  isPage,

  ...attrs
}: CartProps = {}) => {
  const {
    setItems,
    removeItem,

    items,

    items: { length: itemsCount },
    _isHydrated: isCartStoreLoaded,
  } = useCartStore();

  const [isSynchronized, setIsSynchronized] = useState(false);

  useEffect(() => {
    if (!isCartStoreLoaded) return;

    if (!items.length) {
      setIsSynchronized(true);

      return;
    }

    async function syncCart() {
      const [err, { docs: products = [] } = {}] = await flatry(
        trpcClient.products.getProducts.query({
          perPage: null,
          include: items.map(({ id }) => id),
        })
      );

      if (err) return toast.error('Cart synchronization got failed !');

      setIsSynchronized(true);
      setItems(products);
    }

    syncCart();
  }, [isCartStoreLoaded]);

  const isCartLoaded = isCartStoreLoaded && isSynchronized;

  return (
    <div {...attrs}>
      <div className='font-bold text-[1.2em] mb-8'>
        Shopping Cart {isCartLoaded && `(${itemsCount})`}
      </div>

      {!isCartLoaded && <div>Loading...</div>}

      {isCartLoaded && itemsCount > 0 && (
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

      {isCartLoaded && itemsCount === 0 && (
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
