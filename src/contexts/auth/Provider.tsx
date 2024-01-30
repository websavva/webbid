'use client';

import { type PropsWithChildren, useState } from 'react';

import { loadAuthContext } from './load';
import { AuthContext, type AuthInfo, getDefaultAuthInfo } from './context';
import { GetMeResponse } from '@/lib/payload/auth';
import { payloadApi } from '@/lib/payload';

export interface AuthContextProviderProps extends PropsWithChildren {
  initialValue?: AuthInfo;
}

export const AuthContextProvider = ({
  initialValue: initialAuthInfo,
  children,
}: AuthContextProviderProps) => {
  const [authInfo, setAuthInfo] = useState<GetMeResponse>(
    initialAuthInfo || getDefaultAuthInfo()
  );

  const refresh = async (headers?: Headers) => {
    const updatedUser = await loadAuthContext(headers);

    setAuthInfo(updatedUser);
  };

  const logout = async (headers?: Headers) => {
    await payloadApi.auth.logout({ headers });

    setAuthInfo(getDefaultAuthInfo());
  };

  return (
    <AuthContext.Provider
      value={{
        ...authInfo,
        refresh,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
