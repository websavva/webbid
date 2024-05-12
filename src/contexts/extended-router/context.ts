import { createContext } from 'react';

export type ExtendedRouter = ReturnType<
  typeof import('next/navigation').useRouter
>;

export interface ExtendedRouterContext {
  pending: boolean;

  router: ExtendedRouter;
}

export const ExtendedRouterContext = createContext<ExtendedRouterContext>({
  router: {
    push: () => {},
    replace: () => {},
    refresh: () => {},
    back: () => {},
    forward: () => {},
    prefetch: () => {},
  },

  pending: false,
});
