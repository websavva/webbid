'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { useDidUpdateEffect } from './use-did-update-effect';

export const useFullPath = () => {
  const pathname = usePathname();
  const query = useSearchParams().toString();

  const fullPath = [pathname, query].filter(Boolean).join('?');

  return fullPath;
};

export const useOnFullPathUpdate = (
  onUpdate: (newFullPath?: string) => any,
  deps: any[] = []
) => {
  const fullPath = useFullPath();

  useDidUpdateEffect(() => {
    onUpdate(fullPath);
  }, [fullPath, ...deps]);
};
