'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import flatry from 'await-to-js';

import { useCartStore } from '@/hooks/use-cart-store';
import type { DefineProps } from '@/types';
import { trpcClient } from '@/lib/trpc';
import { useApi } from '@/hooks/use-api';
import { useAuth } from '@/hooks/use-auth';

import { CartCompositionIcon } from '../Icons/CartCompositionIcon';
import { Button } from '../UI/Button';
import { Separator } from '../UI/Separator';

import { ProductCard, ProductCardSkeleton } from '../ProductCard';
import { OrderBill } from '../OrderBill';

export type CartProps = DefineProps<{
  isPage?: boolean;
}>;

export const Cart = ({
  isPage,

  ...attrs
}: CartProps = {}) => {
  const { isGuest } = useAuth();

  const {
    setItems,
    removeItem,

    items,

    items: { length: itemsCount },

    _isHydrated: isCartStoreLoaded,
  } = useCartStore();

  const { pending, makeApiCall: createOrder } = useApi(
    () => {
      return trpcClient.orders.createOrder.mutate(items.map(({ id }) => id));
    },
    {
      onSuccess(url) {
        window.location.replace(url);
      },

      onError(err) {
        toast.error(err.message || 'Order creation has failed ! Try again.', {
          dismissible: true,
        });
      },
    },
  );

  const [isSynchronized, setIsSynchronized] = useState(false);

  useEffect(() => {
    if (!isCartStoreLoaded) return;

    if (!items.length) {
      setIsSynchronized(true);

      return;
    }

    async function syncCart() {
      const [err, { products = [] } = {}] = await flatry(
        trpcClient.products.getProducts.query({
          perPage: null,
          include: items.map(({ id }) => id),
        }),
      );

      if (err) return toast.error('Cart synchronization got failed !');

      setIsSynchronized(true);
      setItems(products);
    }

    syncCart();
  }, [isCartStoreLoaded]);

  const isCartLoaded = isCartStoreLoaded && isSynchronized;

  const listClassName = 'space-y-6 max-h-[28rem] overflow-auto no-scrollbar';

  async function onSubmit() {
    if (pending) return;

    await createOrder();
  }

  return (
    <div {...attrs}>
      <div className='mb-8 text-[1.2em] font-bold'>
        Shopping Cart {isCartLoaded && `(${itemsCount})`}
      </div>

      {!isCartLoaded && (
        <div className={listClassName}>
          {[...new Array(3).keys()].map((_, index) => {
            return <ProductCardSkeleton key={index} />;
          })}
        </div>
      )}

      {isCartLoaded && itemsCount > 0 && (
        <>
          <div className={listClassName}>
            {items.map((item) => {
              return (
                <ProductCard
                  key={item.id}
                  product={item}
                  canBeRemoved
                  onRemove={() => removeItem(item.id)}
                />
              );
            })}
          </div>

          <Separator className='my-5' />

          <OrderBill products={items} />

          <div className='mt-7 flex *:w-full'>
            {isPage && !isGuest ? (
              <Button pending={pending} onClick={onSubmit}>
                Checkout
              </Button>
            ) : (
              <Button asChild>
                <Link href={isPage && isGuest ? '/login' : '/cart'}>
                  {!isPage && 'Continue to '} Checkout
                </Link>
              </Button>
            )}
          </div>
        </>
      )}

      {isCartLoaded && itemsCount === 0 && (
        <div>
          <div className='mb-12 mt-8 flex flex-col items-center text-center text-slate-400'>
            <CartCompositionIcon className='h-auto w-1/2' />
          </div>

          <div className='flex flex-col items-center text-center text-xl'>
            <div className='mb-5 font-semibold text-gray-600'>
              Cart is empty...
            </div>

            <Link
              href='/products'
              className='text-base text-blue-500 hover:underline'
            >
              Go to catalog
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
