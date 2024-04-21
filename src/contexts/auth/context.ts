import { createContext } from 'react';

import type { GetMeResponse } from '@/lib/payload/auth';
import type { UserCredentialsDto } from '#server/dtos/auth';

export type AuthInfo = GetMeResponse;

export type AuthContextValue = AuthInfo & {
  refresh: () => Promise<void>;
  logout: (headers?: Headers) => Promise<void>;
  login: (
    userCredentials: UserCredentialsDto,
    headers?: Headers
  ) => Promise<void>;
};

export const getDefaultAuthInfo = (): AuthInfo => ({
  user: null,
  exp: undefined,
  token: undefined,
});

export const AuthContext = createContext<AuthContextValue>({
  ...getDefaultAuthInfo(),
  refresh: async () => {},
  logout: async () => {},
  login: async () => {},
});
