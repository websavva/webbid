'use client';

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

export const TRANSITION_HEIGHT_LISTENERS: Pick<
  EndListenerProps<undefined>,
  'onEnter' | 'onEntering' | 'onEntered' | 'onExit' | 'onExited' | 'onExiting'
> = {
  onEnter(el: HTMLElement) {
    setSensitiveParams(el, '0');
  },

  onEntering(el: HTMLElement) {
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

  onEntered(el: HTMLElement) {
    el.style.height = '';
  },

  onExiting(el: HTMLElement) {
    el.style.height = `${el.offsetHeight}px`;
    requestAnimationFrame(() => {
      forceRepaint(el);
      setSensitiveParams(el, '0');
      el.style.height = '0';
    });
  },

  onExited(el: HTMLElement) {
    setSensitiveParams(el, '');
    el.style.height = '';
  },
};

export function TransitionHeight(props: Partial<TransitionProps>) {
  return (
    <Transition
      timeout={150}
      {...props}
      {...TRANSITION_HEIGHT_LISTENERS}
      unmountOnExit={true}
      mountOnEnter={true}
    />
  );
}
