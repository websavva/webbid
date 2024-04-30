import { type PropsWithChildren } from 'react';

import { AuthContextProvider } from '../auth/Provider';
import { CartStoreHydrationProvider } from '../cart/Provider';
import { AppContext } from './load';

export const AppContextProvider = ({
  initialValue,
  children,
}: PropsWithChildren<{ initialValue: AppContext }>) => {
  const { authContextValue } = initialValue;

  return (
    <AuthContextProvider initialValue={authContextValue}>
      <CartStoreHydrationProvider>{children}</CartStoreHydrationProvider>
    </AuthContextProvider>
  );
};
