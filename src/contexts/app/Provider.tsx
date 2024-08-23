import { type PropsWithChildren } from 'react';

import { AuthContextProvider } from '../auth/Provider';
import { CartStoreHydrationProvider } from '../cart/Provider';
import { AppContext } from './load';
import { ExtendedRouterContextProvider } from '../extended-router/Provider';
import { ScreenMediaQueriesContextProvider } from '../screen-media-queries/Provider';

export const AppContextProvider = ({
  initialValue,
  children,
}: PropsWithChildren<{ initialValue: AppContext }>) => {
  const { authContextValue } = initialValue;

  return (
    <ExtendedRouterContextProvider>
      <AuthContextProvider initialValue={authContextValue}>
        <CartStoreHydrationProvider>
          <ScreenMediaQueriesContextProvider>
            {children}
          </ScreenMediaQueriesContextProvider>
        </CartStoreHydrationProvider>
      </AuthContextProvider>
    </ExtendedRouterContextProvider>
  );
};
