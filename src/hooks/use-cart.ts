import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Product } from '#server/cms/collections/types';

import { useClientStore } from './use-client-store';

export interface CartStore {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (id: Product['id']) => void;

  clear: () => void;
}

export const getDefaultCartStore = (): CartStore => {
  return {
    items: [],

    addItem: () => {},

    removeItem: () => {},

    clear: () => {},
  };
};

const useCartStore = create(
  persist<CartStore>(
    (set) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          return { items: [...state.items, item] };
        });
      },

      removeItem: (id) => {
        set((state) => {
          return {
            items: state.items.filter((item) => item.id !== id),
          };
        });
      },

      clear: () => {
        set(() => {
          return {
            items: [],
          };
        });
      },
    }),
    {
      version: 1,
      name: 'cart-storage',
    }
  )
);

export const useCart = () =>
  useClientStore(useCartStore, getDefaultCartStore(), (state) => state);
