import { useContext, type Context } from 'react';

export const createContextHook = <V>(context: Context<V>) => {
  return () => useContext(context);
};
