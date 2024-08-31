'use client';

import { type PropsWithChildren, useState } from 'react';

import { trpcClient } from '@/lib/trpc';

import type { UserCredentialsDto } from '#server/dtos/auth';

import { loadAuthContext } from './load';
import { AuthContext, type AuthInfo, getDefaultAuthInfo } from './context';

export interface AuthContextProviderProps extends PropsWithChildren {
  initialValue?: AuthInfo;
}

export const AuthContextProvider = ({
  initialValue: initialAuthInfo,
  children,
}: AuthContextProviderProps) => {
  const [authInfo, setAuthInfo] = useState<AuthInfo>(
    initialAuthInfo || getDefaultAuthInfo(),
  );

  const refresh = async (headers?: Headers) => {
    const updatedAuthInfo = await loadAuthContext(headers);

    setAuthInfo(updatedAuthInfo);
  };

  const logout = async (headers?: Headers) => {
    await trpcClient.auth.logout.mutate(undefined, { context: { headers } });

    setAuthInfo(getDefaultAuthInfo());
  };

  const login = async (
    userCredentials: UserCredentialsDto,
    headers?: Headers,
  ) => {
    const { user } = await trpcClient.auth.login.mutate(userCredentials, {
      context: {
        headers,
      },
    });

    const authInfo = { user } as unknown as AuthInfo;

    setAuthInfo(authInfo);
  };

  return (
    <AuthContext.Provider
      value={{
        ...authInfo,
        refresh,
        logout,
        login,
        setAuthInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
