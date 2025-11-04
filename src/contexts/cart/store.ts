import {
  createSlice,
  configureStore,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import type { Product } from '#server/cms/collections/types';

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

export interface CartState {
  items: Product[];
  _isHydrated: boolean;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: (): CartState => ({
    items: [],
    _isHydrated: false,
  }),
  reducers: {
    setIsHydrated: (state, action: PayloadAction<boolean>) => {
      state._isHydrated = action.payload;
    },
    addItem: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<Product['id']>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setItems: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    emptyOut: (state) => {
      state.items = [];
    },
  },
});

export const { setIsHydrated, addItem, removeItem, setItems, emptyOut } =
  cartSlice.actions;

export const createCartStore = () => {
  const persistedReducer = persistReducer(
    {
      key: 'cart-storage',
      version: 1,
      storage,
      whitelist: ['items'],
    },
    cartSlice.reducer,
  );

  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

  const persistor = persistStore(
    store,
    {
      // @ts-expect-error - manualPersist is not in the official types but is supported
      manualPersist: true,
    },
    () => {
      store.dispatch(setIsHydrated(true));
    },
  );

  return {
    store,
    persistor,
  };
};

export type CartStore = ReturnType<typeof createCartStore>['store'];
export type CartStoreApi = CartStore;
export type RootState = ReturnType<CartStore['getState']>;

export const ROOT_STATE_PROP_NAMES: (keyof RootState)[] = [
  'items',
  '_isHydrated',
];
