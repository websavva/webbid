'use client';

import { type PropsWithChildren, useRef } from 'react';
import { useEffect } from 'react';

import { CartStoreApiContext } from './context';
import { createCartStore, type CartStoreApi } from './store';

export const CartStoreApiProvider = ({ children }: PropsWithChildren) => {
  const cartStoreApiRef = useRef<CartStoreApi>();

  if (!cartStoreApiRef.current) {
    cartStoreApiRef.current = createCartStore();
  }

  useEffect(() => {
    cartStoreApiRef.current!.persist.rehydrate();
  }, []);

  return (
    <CartStoreApiContext.Provider value={cartStoreApiRef.current}>
      {children}
    </CartStoreApiContext.Provider>
  );
};
