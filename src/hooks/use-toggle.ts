import { useState, useCallback } from 'react';

export const useToggle = (initialValue: boolean = false) => {
  const [value, setValue] = useState(initialValue);

  const onToggle = useCallback(() => {
    setValue((prevValue) => !prevValue);
  }, [setValue]);

  const onActivate = useCallback(() => {
    setValue(true);
  }, [setValue]);

  const onDeactivate = useCallback(() => {
    setValue(false);
  }, [setValue]);

  const onUpdate = useCallback(
    (newValue: boolean) => {
      setValue(newValue);
    },
    [setValue],
  );

  return {
    value,

    onUpdate,
    onActivate,
    onDeactivate,
    onToggle,
  };
};
