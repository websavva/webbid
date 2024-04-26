import { useEffect, useState } from 'react';

export const useClientStore = <T, F>(
  store: (selector: (state: T) => unknown) => unknown,
  defaultSelectedState: F,
  selector: (state: T) => F
) => {
  const selectedStore = store(selector) as F;
  const [hydratedSelectedStore, setHydratedSelectedStore] =
    useState<F>(defaultSelectedState);

  useEffect(() => {
    setHydratedSelectedStore(selectedStore);
  }, [selectedStore]);

  return hydratedSelectedStore;
};
