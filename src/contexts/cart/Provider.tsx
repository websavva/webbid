'use client';

import { type PropsWithChildren, useRef, useEffect } from 'react';
import { Provider } from 'react-redux';

import { createCartStore } from './store';

export const CartStoreApiProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef<ReturnType<typeof createCartStore>>();

  if (!storeRef.current) {
    storeRef.current = createCartStore();
  }

  useEffect(() => {
    storeRef.current?.persistor.persist();
  }, []);

  return <Provider store={storeRef.current.store}>{children}</Provider>;
};
