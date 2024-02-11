'use client';

import { type PropsWithChildren, useState } from 'react';

import { loadAuthContext } from './load';
import { AuthContext, type AuthInfo, getDefaultAuthInfo } from './context';
import { GetMeResponse } from '@/lib/payload/auth';
import { payloadApi } from '@/lib/payload';
import { trpcClient } from '@/lib/trpc';
import { UserCredentialsDto } from '@/server/dtos/auth';

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

  const login = async (
    userCredentials: UserCredentialsDto,
    headers?: Headers
  ) => {
    const authInfo = await trpcClient.auth.login.mutate(userCredentials, {
      context: {
        headers
      }
    });

    setAuthInfo(authInfo as unknown as AuthInfo);
  };

  return (
    <AuthContext.Provider
      value={{
        ...authInfo,
        refresh,
        logout,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
