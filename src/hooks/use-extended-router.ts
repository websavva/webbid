'use client';

import { useContext } from 'react';

import { ExtendedRouterContext } from '@/contexts/extended-router/context';

export const useExtendedRouter = () => {
  return useContext(ExtendedRouterContext);
};
