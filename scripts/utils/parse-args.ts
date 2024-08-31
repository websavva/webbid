export const parseArgs = (
  rawArgs: string[] = process.argv.slice(2),
): Record<string, true | string | undefined> => {
  return Object.fromEntries(
    rawArgs.map((arg) => {
      const [argName, argValue = true] = arg.replace(/^--/, '').split('=');

      return [argName, argValue];
    }),
  );
};
