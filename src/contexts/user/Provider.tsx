'use client';

import { type PropsWithChildren, useState } from 'react';

import { fetchMe } from './fetch';
import { UserContext, type UserContextValue } from './context';

export interface UserContextProviderProps extends PropsWithChildren {
  initialUser: UserContextValue['user'];
}

export const UserContextProvider = ({
  initialUser,
  children,
}: UserContextProviderProps) => {
  const [user, setUser] = useState<UserContextValue['user']>(initialUser);

  const refresh = async () => {
    const updatedUser = await fetchMe();

    setUser(updatedUser);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        refresh,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
