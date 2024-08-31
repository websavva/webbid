export const toWhereEquals = <Q extends Record<string, any>>(query: Q) => {
  return Object.fromEntries(
    Object.entries(query)
      .filter(([_, paramValue]) => paramValue != undefined)
      .map(([paramName, paramValue]) => [
        paramName,
        {
          equals: paramValue,
        },
      ]),
  );
};
