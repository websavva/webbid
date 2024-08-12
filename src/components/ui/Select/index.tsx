'use client';

'use client';

import type { DefineProps } from '@/types';
import {
  SelectCore,
  SelectCoreContent,
  SelectCoreItem,
  SelectCoreTrigger,
  SelectCoreValue,
} from '@/components/UI/Select/Core';

import { cn } from '@/lib/utils/cn';

export interface SelectOption {
  [key: string]: any;
  id: string;
  label: string;
}

export type SelectProps = Omit<
  DefineProps<
    {
      value: any;
      options: SelectOption[];
      canBeEmpty?: boolean;
      emptyValue?: any;
      emptyLabel?: string;
      placeholder?: string;
      disabled?: boolean;
    },
    HTMLButtonElement
  >,
  'onChange'
> & {
  onChange: (optionId: any) => any;
};

export const EMPTY_VALUE_ID = 'empty-value';

export const Select = ({
  onChange,

  value,
  options,
  canBeEmpty,
  placeholder = 'Select Option',
  emptyLabel = 'None',
  emptyValue = undefined,

  disabled,

  className,
  ...attrs
}: SelectProps) => {
  const derivedOptions = [...options];

  const emptyOption: SelectOption = {
    id: EMPTY_VALUE_ID,
    label: emptyLabel,
  };

  const isEmptyValue = canBeEmpty && value === emptyValue;

  const normalizedValue = isEmptyValue ? EMPTY_VALUE_ID : value;

  const activeOption =
    isEmptyValue
      ? emptyOption
      : options.find(({ id }) => id === value);

  if (canBeEmpty)
    derivedOptions.unshift({
      id: EMPTY_VALUE_ID,
      label: emptyLabel,
    });

  const onOptionChange = (optionId: string) => {
    return onChange(optionId === EMPTY_VALUE_ID ? emptyValue : optionId);
  };

  return (
    <SelectCore
      onValueChange={onOptionChange}
      value={normalizedValue}
    >
      <SelectCoreTrigger
        {...attrs}
        disabled={disabled}
        className={cn(className)}
      >
        <SelectCoreValue placeholder={placeholder}>
          {activeOption?.label || placeholder}
        </SelectCoreValue>
      </SelectCoreTrigger>

      <SelectCoreContent className='w-full'>
        {derivedOptions.map(({ label, id }) => {
          return (
            <SelectCoreItem key={id} value={id}>
              {label}
            </SelectCoreItem>
          );
        })}
      </SelectCoreContent>
    </SelectCore>
  );
};
