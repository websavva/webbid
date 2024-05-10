'use client';

import { useContext } from 'react';

import { AuthContext } from '@/contexts/auth/context';

export const useAuth = () => {
  const authContenxt = useContext(AuthContext);

  const { user } = authContenxt;

  const isGuest = !user;
  const isAdmin = !isGuest && user?.role === 'admin';

  return {
    ...authContenxt,
    isGuest,
    isAdmin,
  };
};
