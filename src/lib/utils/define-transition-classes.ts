import type { TransitionStatus } from 'react-transition-group';

type StrictDefineTransitionClasses = Record<TransitionStatus, string>;

export type DefineTransitionClasses = Pick<
  StrictDefineTransitionClasses,
  'entering' | 'exiting'
> &
  Partial<Omit<StrictDefineTransitionClasses, 'entering' | 'exiting'>>;

export const defineTransitionClasses = ({
  entered,
  entering,
  exited,
  exiting,
  unmounted,
}: DefineTransitionClasses): StrictDefineTransitionClasses => {
  return {
    entering,
    entered: entered || entering,
    exiting,
    exited: exited || exiting,
    unmounted: unmounted || exiting,
  };
};
