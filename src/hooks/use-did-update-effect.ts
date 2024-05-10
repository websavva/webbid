'use client';

import { useRef, useEffect } from 'react';

export const useDidUpdateEffect = (onUpdate: () => any, deps: any[]) => {
  const isMountingRef = useRef(false);

  useEffect(() => {
    isMountingRef.current = true;
  }, []);

  useEffect(() => {
    if (!isMountingRef.current) {
      return onUpdate();
    } else {
      isMountingRef.current = false;
    }
  }, deps);
};
