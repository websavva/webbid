import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, act, fireEvent } from '@testing-library/react';
import { useRef } from 'react';

import { useSwipe, type UseSwipeOptions } from './use-swipe';

describe('useSwipe', () => {
  const target = document.createElement('div');

  target.id = 'target';
  document.body.appendChild(target);

  const setupHook = (options: UseSwipeOptions = {}) => {
    const { result } = renderHook(() => {
      const targetRef = useRef<HTMLDivElement>(target);
      return useSwipe(targetRef, options);
    });

    return { result };
  };

  const mockTouchEventInit = (x: number, y: number): TouchEventInit => ({
    touches: [
      {
        clientX: x,
        clientY: y,
        force: 0,
        identifier: 0,
        pageX: 0,
        pageY: 0,
        radiusX: 0,
        radiusY: 0,
        rotationAngle: 0,
        screenX: 0,
        screenY: 0,
        target,
      },
    ],
  });

  const mockTouchStart = (x: number, y: number) =>
    new TouchEvent('touchstart', mockTouchEventInit(x, y));
  const mockTouchMove = (x: number, y: number) =>
    new TouchEvent('touchmove', mockTouchEventInit(x, y));
  const mockTouchEnd = (x: number, y: number) =>
    new TouchEvent('touchend', mockTouchEventInit(x, y));

  const mockTouchEvents = async (coords: Array<number[]>) => {
    for (let i = 0; i < coords.length; i++) {
      const [x, y] = coords[i];
      let event: any;
      if (i === 0) event = mockTouchStart(x, y);
      else if (i === coords.length - 1) event = mockTouchEnd(x, y);
      else event = mockTouchMove(x, y);

      await act(() => {
        fireEvent(target, event);
      });
    }
  };

  const threshold = 30;
  let onSwipe: any;
  let onSwipeEnd: any;

  beforeEach(() => {
    onSwipe = vi.fn((_e: TouchEvent) => {
      debugger;
    });
    onSwipeEnd = vi.fn((_e: TouchEvent, _direction: string) => {});
    vi.resetAllMocks();
  });

  it('threshold not exceeded', async () => {
    setupHook({ threshold, onSwipe, onSwipeEnd });

    await mockTouchEvents([
      [0, 0],
      [threshold - 1, 0],
      [threshold - 1, 0],
    ]);

    expect(onSwipe).not.toBeCalled();
    expect(onSwipeEnd).not.toBeCalled();
  });

  it('threshold exceeded', async () => {
    setupHook({ threshold, onSwipe, onSwipeEnd });

    await mockTouchEvents([
      [0, 0],
      [threshold / 2, 0],
      [threshold, 0],
      [threshold, 0],
    ]);

    expect(onSwipe).toHaveBeenCalledOnce();
    expect(onSwipeEnd).toHaveBeenCalledOnce();
  });

  it('threshold exceeded in between', async () => {
    setupHook({ threshold, onSwipe, onSwipeEnd });

    await mockTouchEvents([
      [0, 0],
      [threshold / 2, 0],
      [threshold, 0],
      [threshold - 1, 0],
      [threshold - 1, 0],
    ]);

    expect(onSwipe).toBeCalledTimes(2);
    expect(onSwipeEnd).toHaveBeenCalledOnce();
    expect(onSwipeEnd.mock.calls[0][1]).toBe('none');
  });

  it('reactivity', async () => {
    const { result } = setupHook({
      threshold,
      onSwipe,
      onSwipeEnd,
    });

    await act(() => {
      target.dispatchEvent(mockTouchStart(0, 0));
    });

    expect(result.current.isSwiping).toBeFalsy();
    expect(result.current.direction).toBe('none');
    expect(result.current.lengthX).toBe(0);
    expect(result.current.lengthY).toBe(0);

    await act(() => {
      target.dispatchEvent(mockTouchMove(threshold, 5));
    });

    expect(result.current.isSwiping).toBeTruthy();
    expect(result.current.direction).toBe('right');
    expect(result.current.lengthX).toBe(-threshold);
    expect(result.current.lengthY).toBe(-5);

    await act(() => {
      target.dispatchEvent(mockTouchEnd(threshold, 5));
    });
  });

  const directionCases = [
    {
      name: 'up',
      coords: [
        [0, 2 * threshold],
        [0, threshold],
        [0, threshold],
      ],
    },
    {
      name: 'down',
      coords: [
        [0, 0],
        [0, threshold],
        [0, threshold],
      ],
    },
    {
      name: 'left',
      coords: [
        [2 * threshold, 0],
        [threshold, 0],
        [threshold, 0],
      ],
    },
    {
      name: 'right',
      coords: [
        [0, 0],
        [threshold, 0],
        [threshold, 0],
      ],
    },
  ];

  it.each(directionCases)(
    'swipe $name',
    async ({ name: expectedDirection, coords }) => {
      const { result } = setupHook({
        onSwipeEnd,
        threshold,
      });

      await mockTouchEvents(coords);

      expect(result.current.direction).toBe(expectedDirection);
      expect(onSwipeEnd.mock.calls[0][1]).toBe(expectedDirection);
    },
  );
});
