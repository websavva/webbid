import { parseArgs } from './parse-args';

export interface CommandArgs {
  [key: string]: true | string | undefined;
}
export const runCommand = <Options extends CommandArgs = {}>(
  execute: (options: Options) => Promise<any>
) => {
  const options = parseArgs() as Options;

  execute(options);
};
