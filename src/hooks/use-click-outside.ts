'use client';

import { useRef, useEffect } from 'react';

export const useClickOutside = <T extends Element = Element>(
  handler: (this: Element, event: PointerEvent) => any,
) => {
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (
        !elementRef.current ||
        !(event.target instanceof Element) ||
        elementRef.current.contains(event.target)
      )
        return;

      handler.call(event.target as Element, event);
    };

    document.addEventListener('pointerdown', onPointerDown);

    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [handler]);

  return {
    elementRef,
  };
};
