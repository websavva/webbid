import { parseArgs } from './parse-args';

export const runCommand = <Options = {}>(
  execute: (options: Options) => Promise<any>
) => {
  const options = parseArgs() as Options;

  execute(options);
};
