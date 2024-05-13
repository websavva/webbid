import { createContext } from 'react';

export interface ExtendedRouter
  extends ReturnType<typeof import('next/navigation').useRouter> {
  pushQuery: (query: Record<string, any>) => void;
}

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
    pushQuery: (query) => {},
  },

  pending: false,
});
