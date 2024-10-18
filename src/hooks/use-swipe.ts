import { useState, useCallback, useEffect, type useRef } from 'react';

export type UseSwipeDirection = 'up' | 'down' | 'left' | 'right' | 'none';

export interface Position {
  x: number;
  y: number;
}

export interface UseSwipeOptions {
  /**
   * Register events as passive
   *
   * @default true
   */
  passive?: boolean;

  /**
   * @default 50
   */
  threshold?: number;

  /**
   * Callback on swipe start
   */
  onSwipeStart?: (e: TouchEvent) => void;

  /**
   * Callback on swipe moves
   */
  onSwipe?: (e: TouchEvent) => void;

  /**
   * Callback on swipe ends
   */
  onSwipeEnd?: (e: TouchEvent, direction: UseSwipeDirection) => void;
}

const getTouchEventCoords = (e: TouchEvent) => [
  e.touches[0].clientX,
  e.touches[0].clientY,
];

const hasThresholdExceeded = (
  coordsStart: Position,
  coordsEnd: Position,
  threshold: number,
) => {
  const diffX = coordsStart.x - coordsEnd.x;
  const diffY = coordsStart.y - coordsEnd.y;

  const { max, abs } = Math;

  return max(abs(diffX), abs(diffY)) >= threshold;
};

export interface UseSwipeReturn {
  isSwiping: boolean;
  direction: UseSwipeDirection;
  coordsStart: Position;
  coordsEnd: Position;
  lengthX: number;
  lengthY: number;
}

export function useSwipe<E extends HTMLElement>(
  targetRef: ReturnType<typeof useRef<E | null>>,
  options: UseSwipeOptions = {},
): UseSwipeReturn {
  const {
    threshold = 50,
    onSwipe,
    onSwipeEnd,
    onSwipeStart,
    passive = true,
  } = options;

  const [coordsStart, setCoordsStart] = useState<Position>({ x: 0, y: 0 });
  const [coordsEnd, setCoordsEnd] = useState<Position>({ x: 0, y: 0 });

  const diffX = coordsStart.x - coordsEnd.x;
  const diffY = coordsStart.y - coordsEnd.y;

  const [isSwiping, setIsSwiping] = useState(false);

  const { abs } = Math;

  let direction: UseSwipeDirection;
  const wasThresholdExceeded = hasThresholdExceeded(
    coordsStart,
    coordsEnd,
    threshold,
  );

  if (!wasThresholdExceeded) {
    direction = 'none';
  } else if (abs(diffX) > abs(diffY)) {
    direction = diffX > 0 ? 'left' : 'right';
  } else {
    direction = diffY > 0 ? 'up' : 'down';
  }

  debugger;

  const updateCoordsStart = useCallback(
    (x: number, y: number) => {
      setCoordsStart({
        x,
        y,
      });
    },
    [setCoordsStart],
  );

  const updateCoordsEnd = useCallback(
    (x: number, y: number) => {
      setCoordsEnd({
        x,
        y,
      });
    },
    [setCoordsEnd],
  );

  let listenerOptions: { passive?: boolean; capture?: boolean };

  if (!passive) listenerOptions = { passive: false, capture: true };
  else listenerOptions = { passive: true };

  const onTouchStart = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length !== 1) return;

      if (listenerOptions.capture && !listenerOptions.passive)
        e.preventDefault();
      const [x, y] = getTouchEventCoords(e);
      updateCoordsStart(x, y);
      updateCoordsEnd(x, y);
      onSwipeStart?.(e);
    },
    [updateCoordsEnd, updateCoordsStart, onSwipeStart, listenerOptions],
  );

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const [x, y] = getTouchEventCoords(e);

      const newCoordsEnd = {
        x,
        y,
      };

      updateCoordsEnd(x, y);

      if (isSwiping) {
        onSwipe?.(e);
      } else if (hasThresholdExceeded(coordsStart, newCoordsEnd, threshold)) {
        setIsSwiping(true);
        onSwipe?.(e);
      }
    },
    [updateCoordsEnd, setIsSwiping, isSwiping, coordsStart, threshold, onSwipe],
  );

  const onTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (isSwiping) onSwipeEnd?.(e, direction);

      setIsSwiping(false);
    },
    [isSwiping, setIsSwiping, onSwipeEnd, direction],
  );

  useEffect(() => {
    const { current: target } = targetRef;

    target!.addEventListener('touchstart', onTouchStart, listenerOptions);
    target!.addEventListener('touchmove', onTouchMove, listenerOptions);
    target!.addEventListener('touchend', onTouchEnd, listenerOptions);

    return () => {
      target!.removeEventListener('touchstart', onTouchStart, listenerOptions);
      target!.removeEventListener('touchmove', onTouchMove, listenerOptions);
      target!.removeEventListener('touchend', onTouchEnd, listenerOptions);
    };
  }, [onTouchStart, onTouchMove, onTouchEnd, listenerOptions]);

  return {
    isSwiping,
    direction,
    coordsStart,
    coordsEnd,
    lengthX: diffX,
    lengthY: diffY,
  };
}
