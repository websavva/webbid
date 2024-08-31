'use client';

import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';

import { useCartStore } from './store';

export const CartStoreHydrationProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return <>{children}</>;
};
