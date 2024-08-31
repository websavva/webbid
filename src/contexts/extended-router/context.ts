import { createContext } from 'react';
import type { useRouter } from 'next/navigation';

export interface ExtendedRouter extends ReturnType<typeof useRouter> {
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
    pushQuery: (_) => {},
  },

  pending: false,
});
