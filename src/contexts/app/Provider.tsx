import { type PropsWithChildren } from 'react';

import { AuthContextProvider } from '../auth/Provider';
import { CartStoreApiProvider } from '../cart/Provider';

import { ExtendedRouterContextProvider } from '../extended-router/Provider';
import { ScreenMediaQueriesContextProvider } from '../screen-media-queries/Provider';

import type { AppContext } from './load';

export const AppContextProvider = ({
  initialValue,
  children,
}: PropsWithChildren<{ initialValue: AppContext }>) => {
  const { authContextValue } = initialValue;

  return (
    <ExtendedRouterContextProvider>
      <AuthContextProvider initialValue={authContextValue}>
        <CartStoreApiProvider>
          <ScreenMediaQueriesContextProvider>
            {children}
          </ScreenMediaQueriesContextProvider>
        </CartStoreApiProvider>
      </AuthContextProvider>
    </ExtendedRouterContextProvider>
  );
};
