export const isNullishValue = (val: any): val is undefined | null => {
  return val === undefined || val === null;
};
