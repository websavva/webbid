'use client';

import { useContext } from 'react';
import { useStore as extractStore } from 'zustand';

import { CartStoreApiContext } from '@/contexts/cart/context';
import type { CartStore } from '@/contexts/cart/store';

function useCartStore<_ = CartStore>(): CartStore;
function useCartStore<T>(selector: (store: CartStore) => T): T;
function useCartStore<T>(selector?: (store: CartStore) => T) {
  const cartStoreApi = useContext(CartStoreApiContext);

  if (!cartStoreApi) {
    throw new Error(`useCartStore must be used within CartStoreApiProvider`);
  }

  if (selector) {
    return extractStore(cartStoreApi, selector);
  } else {
    return extractStore(cartStoreApi);
  }
}

export { useCartStore };
