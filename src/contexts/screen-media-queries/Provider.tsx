'use client';

import { type PropsWithChildren, useState, useEffect, useRef } from 'react';

import { useIsMounted } from '@/hooks/use-is-mounted';

import { ScreenMediaQueriesContext } from './context';

import { getDefaultMinScreenFlags, screenNames, screens } from './config';
import type {
  MaxScreenFlags,
  MinScreenFlags,
  ScreenMediaQueryCallbacks,
} from './types';

export const ScreenMediaQueriesContextProvider = ({
  children,
}: PropsWithChildren) => {
  const isMounted = useIsMounted();

  const [minScreenFlags, setMinScreenFlags] = useState(
    getDefaultMinScreenFlags(),
  );
  const callbacksRef = useRef<ScreenMediaQueryCallbacks | null>(null);

  const maxScreenFlags = Object.fromEntries(
    screenNames.map((screenName) => [
      `max-${screenName}`,
      isMounted && !minScreenFlags[screenName],
    ]),
  ) as MaxScreenFlags;

  useEffect(() => {
    if (!callbacksRef.current) {
      const callbacks: Partial<ScreenMediaQueryCallbacks> = {};
      const initialMinScreenFlags: Partial<MinScreenFlags> = {};

      for (const screenName of screenNames) {
        const mq = window.matchMedia(`(min-width:${screens[screenName]})`);

        initialMinScreenFlags[screenName] = mq.matches;

        const callback = ({ matches }: MediaQueryListEvent) => {
          setMinScreenFlags((prevMinScreenFlags) => ({
            ...prevMinScreenFlags,
            [screenName]: matches,
          }));
        };

        mq.addEventListener('change', callback);

        callbacks[screenName] = {
          mq,
          callback,
        };
      }

      setMinScreenFlags(initialMinScreenFlags as MinScreenFlags);

      callbacksRef.current = callbacks as ScreenMediaQueryCallbacks;
    }

    return () => {
      if (!callbacksRef.current) return;

      for (const { mq, callback } of Object.values(callbacksRef.current)) {
        mq.removeEventListener('change', callback);
      }

      callbacksRef.current = null;
    };
  }, [setMinScreenFlags]);

  return (
    <ScreenMediaQueriesContext.Provider
      value={{
        ...minScreenFlags,
        ...maxScreenFlags,
      }}
    >
      {children}
    </ScreenMediaQueriesContext.Provider>
  );
};
