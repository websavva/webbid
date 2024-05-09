import { isNullishValue } from './is-nullish-value';

export const transformFormToQuery = (
  form: Record<string, any>,
  defaultForm: Record<string, any>
) => {
  return Object.fromEntries(
    Object.entries(form).filter(([fieldName, fieldValue]) => {
      return (
        !isNullishValue(fieldValue) && defaultForm[fieldName] !== fieldValue
      );
    })
  );
};
