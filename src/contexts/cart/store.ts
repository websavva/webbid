import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Product } from '#server/cms/collections/types';

export interface CartStore {
  items: Product[];

  _isHydrated: boolean;

  setIsHydrated: (isHydrated: boolean) => void;

  addItem: (item: Product) => void;
  removeItem: (id: Product['id']) => void;

  setItems: (id: Product[]) => void;

  emptyOut: () => void;
}

export const createCartStore = () =>
  create(
    persist<CartStore>(
      (set) => ({
        items: [],

        _isHydrated: false,

        setIsHydrated: (isHydrated: boolean) => {
          set({
            _isHydrated: isHydrated,
          });
        },

        addItem: (item) => {
          set((state) => {
            console.log({
              addItem: state.items,
            });

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

        setItems: (items: Product[]) => {
          console.log({
            setItems: items,
          });

          set({
            items,
          });
        },

        emptyOut: () => {
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

        skipHydration: true,

        onRehydrateStorage: () => (state) => {
          state?.setIsHydrated(true);
        },
      },
    ),
  );

export type CartStoreApi = ReturnType<typeof createCartStore>;
