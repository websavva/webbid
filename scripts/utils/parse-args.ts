export const parseArgs = (rawArgs: string[] = process.argv.slice(2)): Record<string, any> => {
  return Object.fromEntries(
    rawArgs.map((arg) => {
      const [argName, argValue = true] = arg.replace(/^--/, '').split('=');

      return [argName, argValue];
    })
  );
};
