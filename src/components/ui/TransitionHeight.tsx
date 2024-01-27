'use client';

import { type RefObject } from 'react';
import { Transition } from 'react-transition-group';
import type {
  EndListenerProps,
  TransitionProps,
} from 'react-transition-group/Transition';

const allowsSensitiveParams = [
  'opacity',
  'marginTop',
  'marginBottom',
  'paddingTop',
  'paddingBottom',
  'borderTopWidth',
  'borderBottomWidth',
] as const;

const forceRepaint = (el: HTMLElement) => el.offsetHeight;

const setSensitiveParams = (el: HTMLElement, newVal: string) => {
  allowsSensitiveParams.forEach((k) => (el.style[k] = newVal));
};

export const useTransitionHeightListeners = (
  nodeRef: RefObject<HTMLElement | null>
): Pick<
  EndListenerProps<HTMLElement>,
  'onEnter' | 'onEntering' | 'onEntered' | 'onExit' | 'onExited' | 'onExiting'
> => {
  return {
    onEnter() {
      const el = nodeRef.current;
      if (!el) return;

      setSensitiveParams(nodeRef.current!, '0');
    },

    onEntering() {
      const el = nodeRef.current;
      if (!el) return;

      const width = getComputedStyle(el).width;
      el.style.width = width;
      el.style.position = 'absolute';
      el.style.visibility = 'hidden';
      el.style.height = 'auto';
      const height = forceRepaint(el);
      el.style.width = '';
      el.style.position = '';
      el.style.visibility = '';
      el.style.height = '0';

      requestAnimationFrame(() => {
        el.style.height = `${height}px`;
        forceRepaint(el);
        setSensitiveParams(el, '');
        forceRepaint(el);
      });
    },

    onEntered() {
      const el = nodeRef.current;
      if (!el) return;

      el.style.height = '';
    },

    onExiting() {
      const el = nodeRef.current;
      if (!el) return;

      el.style.height = `${el.offsetHeight}px`;
      requestAnimationFrame(() => {
        forceRepaint(el);
        setSensitiveParams(el, '0');
        el.style.height = '0';
      });
    },

    onExited() {
      const el = nodeRef.current;
      if (!el) return;

      setSensitiveParams(el, '');
      el.style.height = '';
    },
  };
};

export type TransitionHeightProps = Partial<
  Omit<TransitionProps, 'nodeRef'>
> & { nodeRef: RefObject<HTMLElement | null> };

export function TransitionHeight(props: TransitionHeightProps) {
  const { nodeRef } = props;

  const transitionHeightListeners = useTransitionHeightListeners(nodeRef);

  return (
    <Transition
      timeout={150}
      {...props}
      nodeRef={nodeRef as any}
      {...transitionHeightListeners}
      unmountOnExit={true}
      mountOnEnter={true}
    />
  );
}
