import { type PropsWithChildren } from 'react';

import { AuthContextProvider } from '../auth/Provider';
import { CartStoreHydrationProvider } from '../cart/Provider';
import { AppContext } from './load';
import { ExtendedRouterContextProvider } from '../extended-router/Provider';


export const AppContextProvider = ({
  initialValue,
  children,
}: PropsWithChildren<{ initialValue: AppContext }>) => {
  const { authContextValue } = initialValue;

  return (
    <ExtendedRouterContextProvider>
      <AuthContextProvider initialValue={authContextValue}>
        <CartStoreHydrationProvider>{children}</CartStoreHydrationProvider>
      </AuthContextProvider>
    </ExtendedRouterContextProvider>
  );
};
