import { createContext } from 'react';

import type { CartStoreApi } from './store';

// @ts-expect-error it is quit cumbersome to create default value
// for CartStoreApi
export const CartStoreApiContext = createContext<CartStoreApi>(undefined);
