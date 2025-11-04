'use client';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useMemo } from 'react';

import type { RootState, CartState } from '@/contexts/cart/store';
import type { Product } from '#server/cms/collections/types';
import {
  addItem as addItemAction,
  removeItem as removeItemAction,
  setItems as setItemsAction,
  emptyOut as emptyOutAction,
  setIsHydrated as setIsHydratedAction,
} from '@/contexts/cart/store';

export interface CartStore extends CartState {
  addItem: (item: Product) => void;
  removeItem: (id: Product['id']) => void;
  setItems: (items: Product[]) => void;
  emptyOut: () => void;
  setIsHydrated: (isHydrated: boolean) => void;
}

function useCartStore(): CartStore;
function useCartStore<T>(selector: (store: CartStore) => T): T;
function useCartStore<T>(selector?: (store: CartStore) => T): T | CartStore {
  const dispatch = useDispatch();

  const state = useSelector(
    ({ items, _isHydrated }: RootState) => ({
      items,
      _isHydrated,
    }),
    shallowEqual,
  );

  // Memoize actions to prevent recreating them on every render
  const actions = useMemo(() => {
    return {
      addItem: (item: Product) => dispatch(addItemAction(item)),
      removeItem: (id: Product['id']) => dispatch(removeItemAction(id)),
      setItems: (items: Product[]) => dispatch(setItemsAction(items)),
      emptyOut: () => dispatch(emptyOutAction()),
      setIsHydrated: (isHydrated: boolean) =>
        dispatch(setIsHydratedAction(isHydrated)),
    };
  }, [dispatch]);

  // Memoize the combined store object
  const store = useMemo<CartStore>(() => {
    return {
      ...state,
      ...actions,
    };
  }, [state, actions]);

  if (selector) {
    return selector(store);
  }

  return store;
}

export { useCartStore };
