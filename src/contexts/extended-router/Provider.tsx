'use client';

import { withQuery } from 'ufo';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren, useState, useTransition } from 'react';

import { type ExtendedRouter, ExtendedRouterContext } from './context';

export const ExtendedRouterContextProvider = ({
  children,
}: PropsWithChildren) => {
  const pathname = usePathname();
  const router = useRouter();

  const [pending, startTransition] = useTransition();

  const extendedRouter: ExtendedRouter = {
    ...router,

    push: (...args: Parameters<ExtendedRouter['push']>) => {
      return startTransition(() => {
        return router.push(...args);
      });
    },

    replace: (...args: Parameters<ExtendedRouter['replace']>) => {
      return startTransition(() => {
        return router.replace(...args);
      });
    },

    pushQuery: (query) => {
      return startTransition(() => {
        return router.push(withQuery(pathname, query));
      });
    },
  };

  return (
    <ExtendedRouterContext.Provider
      value={{
        router: extendedRouter,
        pending,
      }}
    >
      {children}
    </ExtendedRouterContext.Provider>
  );
};
