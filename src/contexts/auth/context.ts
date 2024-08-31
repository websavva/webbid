import { createContext } from 'react';

import type { User } from '#server/cms/collections/types';
import type { UserCredentialsDto } from '#server/dtos/auth';

export type AuthInfo = {
  user: User | null;
};

export type AuthContextValue = AuthInfo & {
  refresh: () => Promise<void>;
  logout: (headers?: Headers) => Promise<void>;
  login: (
    userCredentials: UserCredentialsDto,
    headers?: Headers,
  ) => Promise<void>;
  setAuthInfo: (authInfo: AuthInfo) => void;
};

export const getDefaultAuthInfo = (): AuthInfo => ({
  user: null,
});

export const AuthContext = createContext<AuthContextValue>({
  ...getDefaultAuthInfo(),
  refresh: async () => {},
  logout: async () => {},
  login: async () => {},
  setAuthInfo: () => {},
});
