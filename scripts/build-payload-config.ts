import { runCommand } from './utils/run-command';
import { Builder } from './utils/builder';

runCommand(async () => {
  await Builder.buildCMSConfig();
});
