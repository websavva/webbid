import { Builder } from './utils/builder';
import { runCommand } from './utils/run-command';

interface BuildCommandArgs {
  watch: string;
}

runCommand<BuildCommandArgs>(async (options) => {
  const isDev = Boolean(options.watch);

  await Builder.build(isDev);
});
