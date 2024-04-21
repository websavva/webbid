import type { HTMLAttributes } from 'react';

export type DefineProps<
  P extends Record<string, any>,
  E extends Element = HTMLElement,
> = HTMLAttributes<E> & P;
